"use client";
import { useState } from "react";
import { Button } from "./ui/Button";
import { clsx } from "clsx";

const links = ["Features","Integrations","Pricing","Company","Changelog"];

export default function Header(){
    const [open, setOpen] = useState(false);
    return (
        <header className="sticky top-0 z-30 backdrop-blur bg-bg/70 border-b border-white/5">
            <div className="container h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="size-6 rounded-md bg-brand shadow-glow" />
                        <span className="font-display font-semibold tracking-tight">AI Startup</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
                        {links.map(l => <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white">{l}</a>)}
                    </nav>
                </div>
                <div className="hidden md:flex items-center gap-3">
                    <a href="#login" className="text-sm text-white/70 hover:text-white">Log in</a>
                    <Button size="md">Join waitlist</Button>
                </div>

                <button className="md:hidden text-white/80" onClick={()=>setOpen(v=>!v)} aria-label="Menu">☰</button>
            </div>
            {/* mobile */}
            <div className={clsx("md:hidden border-t border-white/5", open ? "block":"hidden")}>
                <div className="container py-4 flex flex-col gap-3 text-sm">
                    {links.map(l => <a key={l} href={`#${l.toLowerCase()}`} className="py-1 text-white/80">{l}</a>)}
                    <Button className="mt-2">Join waitlist</Button>
                </div>
            </div>
        </header>
    );
}