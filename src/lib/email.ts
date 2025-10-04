import { Resend } from "resend";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type SMTPPool from "nodemailer/lib/smtp-pool";
import type SESTransport from "nodemailer/lib/ses-transport";

const RESEND_KEY = process.env.RESEND_API_KEY || "";
const useResend = RESEND_KEY.startsWith("re_");

const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = process.env.MAIL_PORT ? Number(process.env.MAIL_PORT) : undefined;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;
const MAIL_SECURE = (process.env.MAIL_SECURE ?? "").toLowerCase() === "true";

const resend = useResend ? new Resend(RESEND_KEY) : null;

function templateConfirm(url: string) {
    return `
<div style="font-family:Inter,Arial,sans-serif;background:#0b0b0f;padding:28px;color:#fff">
  <div style="max-width:560px;margin:0 auto;background:#11121a;border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:22px">
    <h2 style="margin:0 0 10px 0;">Confirm your spot on the waitlist</h2>
    <p style="color:rgba(255,255,255,.75)">Thanks for joining Amestia. Please confirm your email so we can notify you at launch.</p>
    <a href="${url}" style="display:inline-block;margin-top:12px;padding:10px 16px;border-radius:9999px;background:#7c3aed;color:#fff;text-decoration:none">
      Confirm email
    </a>
    <p style="margin-top:18px;color:rgba(255,255,255,.55);font-size:12px">If the button doesn't work, open this link:<br>
      <span style="word-break:break-all;color:#a78bfa">${url}</span>
    </p>
  </div>
</div>`;
}

function templateUnsubscribe(url: string) {
    return `<p style="margin-top:24px;color:rgba(255,255,255,.55);font-size:12px">Don't want emails from us? <a href="${url}" style="color:#a78bfa">Unsubscribe</a>.</p>`;
}

async function getTransport(): Promise<nodemailer.Transporter> {
    if (MAIL_HOST && MAIL_PORT) {
        console.log("MAIL: using custom SMTP", { host: MAIL_HOST, port: MAIL_PORT, secure: MAIL_SECURE });
        return nodemailer.createTransport({
            host: MAIL_HOST,
            port: MAIL_PORT,
            secure: MAIL_SECURE,
            auth: MAIL_USER && MAIL_PASS ? { user: MAIL_USER, pass: MAIL_PASS } : undefined,
        });
    }

    try {
        const test = await nodemailer.createTestAccount();
        console.log("MAIL: using Ethereal test account", test.user);
        return nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: { user: test.user, pass: test.pass },
        });
    } catch (err: any) {
        console.warn("MAIL: Ethereal unavailable, falling back to streamTransport (mock). Reason:", err?.code || err?.message || err);
        return nodemailer.createTransport({
            streamTransport: true,
            newline: "unix",
            buffer: true,
        } as any);
    }
}

export async function sendWaitlistConfirmation(to: string, confirmUrl: string): Promise<string | null> {
    try {
        if (useResend && resend) {
            await resend.emails.send({
                from: process.env.EMAIL_FROM || "Amestia <no-reply@amestia.dev>",
                to,
                subject: "Confirm your spot on the Amestia waitlist",
                html: templateConfirm(confirmUrl),
            });
            return null;
        }

        const transporter = await getTransport();
        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM || '"Amestia" <no-reply@amestia.dev>',
            to,
            subject: "Confirm your spot on the Amestia waitlist",
            html: templateConfirm(confirmUrl),
        });

        const testUrl = nodemailer.getTestMessageUrl(info as any) as string | false;
        if (testUrl) {
            console.log("Ethereal preview URL:", testUrl);
            return testUrl;
        }

        console.log("MAIL: mock transport used, returning confirmUrl as preview");
        return confirmUrl;
    } catch (err) {
        console.error("ERROR in sendWaitlistConfirmation:", err);
        return confirmUrl;
    }
}

export async function sendBroadcast(
    to: string,
    subject: string,
    html: string,
    unsubscribeUrl?: string
): Promise<string | null> {
    const footer = unsubscribeUrl ? html + templateUnsubscribe(unsubscribeUrl) : html;

    if (useResend && resend) {
        await resend.emails.send({
            from: process.env.EMAIL_FROM || "Amestia <no-reply@amestia.dev>",
            to,
            subject,
            html: footer,
        });
        return null;
    }

    const transporter = await getTransport();
    const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM || '"Amestia" <no-reply@amestia.dev>',
        to,
        subject,
        html: footer,
    });

    const testUrl = nodemailer.getTestMessageUrl(info as any) as string | false;
    if (testUrl) {
        console.log("Ethereal preview URL:", testUrl);
        return testUrl;
    }
    console.log("MAIL: mock transport used for broadcast, no preview URL");
    return null;
}