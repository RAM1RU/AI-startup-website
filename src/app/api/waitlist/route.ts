export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import crypto from "node:crypto";
import { sendWaitlistConfirmation } from "@/lib/email";

const schema = z.object({
    email: z.string().email(),
});

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const { email } = schema.parse(json);

        const existing = await prisma.waitlist.findUnique({ where: { email } });
        const token = crypto.randomUUID();
        const confirmUrl = `${process.env.APP_URL}/api/waitlist/confirm?token=${token}`;

        // helper: отправить письмо и вернуть JSON с previewUrl (в dev через Ethereal)
        const sendAndReply = async (extra: Record<string, any> = {}) => {
            const previewUrl = await sendWaitlistConfirmation(email, confirmUrl);
            const body: any = { ok: true, ...extra };
            // В dev удобно видеть ссылку; в проде она будет null (Resend)
            if (process.env.NODE_ENV !== "production") body.previewUrl = previewUrl;
            return NextResponse.json(body);
        };

        if (existing) {
            if (existing.confirmed) {
                return NextResponse.json({ ok: true, already: true });
            }
            await prisma.waitlist.update({
                where: { email },
                data: { confirmationToken: token },
            });
            return sendAndReply({ resent: true });
        }

        await prisma.waitlist.create({
            data: { email, confirmationToken: token },
        });

        return sendAndReply();
    } catch (e: any) {
        if (e?.name === "ZodError") {
            return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
        }
        console.error(e);
        return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
    }
}