"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/Button";
import { clsx } from "clsx";

type Link = { label: string; href: string; chevron?: boolean };
const links: Link[] = [
    { label: "Features", href: "#features", chevron: true },
    { label: "Visual", href: "#visual" },
    { label: "Reviews", href: "#reviews" },
    { label: "Pricing", href: "#pricing", chevron: true },
];

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-4 z-40">
            <div className="container">
                {/* стеклянная плашка с границей — как в макете */}
                <div className="flex h-14 items-center justify-between rounded-2xl border border-white/10 bg-[#0F1016]/70 px-3 backdrop-blur-md shadow-card">
                    {/* ЛОГО + бренд */}
                    <a href="/" className="flex items-center gap-3">
                        <div className="relative w-8 h-8 flex items-center justify-center rounded-md bg-black/20">
                            <Image
                                src="/Logo.png"
                                alt="AI Startup Logo"
                                width={32}
                                height={32}
                                priority
                                className="object-contain drop-shadow-[0_0_18px_rgba(124,58,237,.85)]"
                            />
                        </div>
                        <span className="ml-2 font-display font-semibold tracking-tight">AMESTIA</span>
                    </a>

                    {/* НАВИГАЦИЯ — desktop */}
                    <nav className="hidden md:flex items-center gap-6">
                        {links.map(({ label, href, chevron }) => (
                            <a
                                key={label}
                                href={href}
                                className="text-sm text-white/70 hover:text-white transition-colors inline-flex items-center gap-1"
                            >
                                {label}
                                {chevron && <span className="text-white/40 text-xs">▾</span>}
                            </a>
                        ))}
                    </nav>

                    {/* Правый блок */}
                    <div className="hidden md:flex items-center gap-3">
                        <a href="#login" className="text-sm text-white/70 hover:text-white transition-colors">
                            Log in
                        </a>
                        {/* твоя кнопка уже ок */}
                        <Button size="md">Join waitlist</Button>
                    </div>

                    {/* Бургер для мобилок */}
                    <button
                        className="md:hidden text-white/80 h-8 w-8 grid place-items-center rounded-lg hover:bg-white/5"
                        onClick={() => setOpen(v => !v)}
                        aria-label="Menu"
                    >
                        ☰
                    </button>
                </div>

                {/* mobile menu */}
                <div className={clsx("md:hidden mt-2 rounded-2xl border border-white/10 bg-[#0F1016]/80 backdrop-blur-md", open ? "block":"hidden")}>
                    <div className="p-3 flex flex-col gap-2 text-sm">
                        {links.map(({ label, href }) => (
                            <a key={label} href={href} className="px-2 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/5">
                                {label}
                            </a>
                        ))}
                        <a href="#login" className="px-2 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/5">
                            Log in
                        </a>
                        <Button className="mt-1 w-full" size="md">Join waitlist</Button>
                    </div>
                </div>
            </div>
        </header>
    );
}