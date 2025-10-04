export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get("email");
    if (!email) return NextResponse.json({ ok: false, error: "Missing email" }, { status: 400 });

    const existing = await prisma.waitlist.findUnique({ where: { email } });
    if (!existing) return NextResponse.redirect(new URL("/thank-you?unsub=missing", req.url));
    if (existing.unsubscribed) return NextResponse.redirect(new URL("/thank-you?unsub=already", req.url));

    await prisma.waitlist.update({ where: { email }, data: { unsubscribed: true } });
    return NextResponse.redirect(new URL("/thank-you?unsub=1", req.url));
}