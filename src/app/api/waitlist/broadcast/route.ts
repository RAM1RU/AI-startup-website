export const runtime = "nodejs";


import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendBroadcast } from "@/lib/email";


export async function POST(req: NextRequest) {
    const token = req.headers.get("x-admin-token");
    if (!token || token !== process.env.ADMIN_TOKEN) {
        return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }


    const { subject, html, dryRun } = await req.json();
    if (!subject || !html) {
        return NextResponse.json({ ok: false, error: "Missing subject/html" }, { status: 400 });
    }


    const recipients = await prisma.waitlist.findMany({
        where: { confirmed: true, unsubscribed: false },
        select: { email: true },
    });


    if (dryRun) {
        console.log(`[DRY RUN] Would send to ${recipients.length} recipients`);
        return NextResponse.json({ ok: true, recipients: recipients.length, dryRun: true });
    }


    for (const { email } of recipients) {
        const unsubUrl = `${process.env.APP_URL}/api/waitlist/unsubscribe?email=${encodeURIComponent(email)}`;
        await sendBroadcast(email, subject, html, unsubUrl);
    }


    return NextResponse.json({ ok: true, sent: recipients.length });
}