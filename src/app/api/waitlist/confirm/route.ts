export const runtime = "nodejs";


import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(req: NextRequest) {
    const token = req.nextUrl.searchParams.get("token");
    if (!token) return NextResponse.redirect(new URL("/thank-you?err=1", req.url));


    const found = await prisma.waitlist.findFirst({ where: { confirmationToken: token } });
    if (!found) return NextResponse.redirect(new URL("/thank-you?err=1", req.url));


    await prisma.waitlist.update({
        where: { id: found.id },
        data: { confirmed: true, confirmedAt: new Date(), confirmationToken: null },
    });


    return NextResponse.redirect(new URL("/thank-you?ok=1", req.url));
}