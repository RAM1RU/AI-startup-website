"use client";
import Section from "../Section";
import Announcement from "../Announcement";
import { Button } from "../ui/Button";
import Image from "next/image";

export default function Hero(){
    return (
        <Section className="pt-16 md:pt-20">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[rgba(17,18,26,.65)] p-8 md:p-12">
                {/* мягкая подсветка сверху */}
                <div aria-hidden className="absolute inset-0 rounded-2xl pointer-events-none blur-3xl opacity-60
          [background:radial-gradient(600px_300px_at_50%_-10%,rgba(124,58,237,.35),transparent)]" />
                <div className="relative max-w-3xl">
                    <Announcement />
                    <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
                        Elevate your <span className="text-brand">SEO</span> efforts.
                    </h1>
                    <p className="mt-6 text-lg text-white/70">
                        Elevate your site’s visibility effortlessly with AI, where smart technology meets user-friendly SEO tools.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                        <input
                            className="h-12 rounded-xl bg-bg/60 border border-white/10 px-4 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand/40"
                            placeholder="Your email" aria-label="Email"
                        />
                        <Button size="lg">Join waitlist</Button>
                    </div>

                    <div className="mt-6 flex items-center gap-6 text-sm text-white/40">
                        <span>Trusted by innovative teams</span>
                        <div className="flex gap-6 opacity-80">
                            <Image src="/logos/celestial.svg" width={84} height={18} alt="Celestial" />
                            <Image src="/logos/apex.svg" width={64} height={18} alt="APEX" />
                            <Image src="/logos/quantum.svg" width={92} height={18} alt="Quantum" />
                            <Image src="/logos/pulse.svg" width={70} height={18} alt="Pulse" />
                        </div>
                    </div>
                </div>

                {/* кубы справа (экспортируй из Figma в public/hero-cubes.png) */}
                <div className="pointer-events-none absolute right-0 top-0 hidden md:block">
                    <Image src="/hero-cubes.png" width={520} height={520} alt="" className="opacity-80" />
                </div>
            </div>
        </Section>
    );
}