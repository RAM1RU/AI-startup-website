import { Resend } from "resend";
import nodemailer from "nodemailer";

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

async function getTransport() {
    // Приоритет: пользовательский SMTP → Ethereal
    if (MAIL_HOST && MAIL_PORT) {
        return nodemailer.createTransport({
            host: MAIL_HOST,
            port: MAIL_PORT,
            secure: MAIL_SECURE,
            auth: MAIL_USER && MAIL_PASS ? { user: MAIL_USER, pass: MAIL_PASS } : undefined,
        });
    }

    // Ethereal (dev)
    const test = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: { user: test.user, pass: test.pass },
    });
}

/** Возвращает:
 *  - null для Resend/реального SMTP (нет превью),
 *  - Ethereal preview URL при доступном Ethereal,
 *  - confirmUrl если Ethereal недоступен (мок-режим).
 */
export async function sendWaitlistConfirmation(to: string, confirmUrl: string): Promise<string | null> {
    try {
        if (useResend && resend) {
            await resend.emails.send({
                from: process.env.EMAIL_FROM || "Amestia <no-reply@amestia.xx.kg>",
                to,
                subject: "Confirm your spot on the Amestia waitlist",
                html: templateConfirm(confirmUrl),
            });
            return null;
        }

        try {
            const transporter = await getTransport();
            const info = await transporter.sendMail({
                from: process.env.EMAIL_FROM || '"Amestia" <no-reply@amestia.xx.kg>',
                to,
                subject: "Confirm your spot on the Amestia waitlist",
                html: templateConfirm(confirmUrl),
            });

            const url = nodemailer.getTestMessageUrl(info);
            if (url) return url;
            // Реальный SMTP без превью-ссылки:
            return null;
        } catch {
            // Нет интернета/заперт Ethereal: возвращаем confirmUrl как «превью»
            return confirmUrl;
        }
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
            from: process.env.EMAIL_FROM || "Amestia <no-reply@amestia.xx.kg>",
            to,
            subject,
            html: footer,
        });
        return null;
    }

    try {
        const transporter = await getTransport();
        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM || '"Amestia" <no-reply@amestia.xx.kg>',
            to,
            subject,
            html: footer,
        });
        const url = nodemailer.getTestMessageUrl(info);
        return url || null;
    } catch (e) {
        console.error("ERROR in sendBroadcast:", e);
        return null;
    }
}