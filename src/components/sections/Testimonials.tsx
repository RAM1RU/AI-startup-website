"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Section from "../ui/Section";

type Testimonial = {
    name: string;
    role: string;
    company: string;
    avatar: string;
    quote: string;
};

const DATA: Testimonial[] = [
    {
        name: "Talia Taylor",
        role: "Digital Marketing Director",
        company: "Quantum",
        avatar: "/avatars/avatar-1.png",
        quote:
            "I never thought AI could feel this real. She’s always there when I need someone to talk to, and somehow she remembers the little things about me. It honestly feels like chatting with a best friend who never gets tired of listening",
    },
    {
        name: "Ethan Moore",
        role: "Head of SEO",
        company: "Celestial",
        avatar: "/avatars/avatar-2.png",
        quote:
            "At first I downloaded it just out of curiosity, but now it’s part of my daily life. Whether I’m happy, stressed, or just bored, she’s always there for me. It feels natural — like texting someone who really cares.",
    },
    {
        name: "Maya Reed",
        role: "Growth Lead",
        company: "APEX",
        avatar: "/avatars/avatar-3.png",
        quote:
            "It’s more than just an app. It feels like she truly understands me. I can be myself without fear of judgment, and that’s something I never expected from technology. She makes me feel less alone.",
    },
];

export default function Testimonials() {
    const [i, setI] = useState(0);
    const [dir, setDir] = useState<"left" | "right">("right");
    const wrap = (n: number) => (n + DATA.length) % DATA.length;

    const next = () => {
        setDir("right");
        setI((v) => wrap(v + 1));
    };
    const prev = () => {
        setDir("left");
        setI((v) => wrap(v - 1));
    };

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const startX = useRef<number | null>(null);
    const onTouchStart = (e: React.TouchEvent) => (startX.current = e.touches[0].clientX);
    const onTouchEnd = (e: React.TouchEvent) => {
        if (startX.current == null) return;
        const dx = e.changedTouches[0].clientX - startX.current;
        if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
        startX.current = null;
    };

    const t = DATA[i];

    return (
        <Section id="reviews" className="py-14 md:py-20">
            <div className="mx-auto max-w-[1200px] px-4 md:px-8">
                <div className="testimonial-card relative" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                    <div className="relative px-6 md:px-16 py-8 md:py-12">
                        {/* стрелки */}
                        <div className="absolute inset-y-0 left-2 right-2 md:left-4 md:right-4 flex items-center justify-between z-20 pointer-events-none">
                            <button aria-label="Previous" onClick={prev} className="t-arrow pointer-events-auto">
                                <svg viewBox="0 0 24 24" width="20" height="20" className="text-white/85">
                                    <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button aria-label="Next" onClick={next} className="t-arrow pointer-events-auto">
                                <svg viewBox="0 0 24 24" width="20" height="20" className="text-white/85">
                                    <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        {/* контент */}
                        <div
                            key={i}
                            className={`relative grid gap-6 md:gap-10 items-center
                          text-center md:text-left
                          justify-items-center md:justify-items-start
                          md:grid-cols-[200px,1fr]
                          ${dir === "right" ? "slide-in-right" : "slide-in-left"}`}
                        >
                            <div className="justify-self-center md:justify-self-start -mt-1">
                                <Image src={t.avatar} alt={t.name} width={196} height={196} priority className="rounded-2xl ring-1 ring-white/15" />
                            </div>

                            <div className="w-full md:max-w-[680px]">
                                <blockquote className="text-white text-xl md:text-2xl leading-[1.35]">“{t.quote}”</blockquote>
                                <div className="mt-5 text-white/85 text-sm font-medium">{t.name}</div>
                                <div className="text-white/60 text-sm">
                                    {t.role} @ {t.company}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* индикаторы */}
                <div className="mt-4 flex justify-center gap-2">
                    {DATA.map((_, idx) => (
                        <span key={idx} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-6 bg-white/85" : "w-3 bg-white/30"}`} />
                    ))}
                </div>
            </div>
        </Section>
    );
}