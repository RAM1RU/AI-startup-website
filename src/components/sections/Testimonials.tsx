"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Section from "../Section";

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
            "This product has completely transformed how I manage my projects and deadlines",
    },
    {
        name: "Ethan Moore",
        role: "Head of SEO",
        company: "Celestial",
        avatar: "/avatars/avatar-2.png",
        quote:
            "Setup took minutes and our team finally has clear, actionable insights every day.",
    },
    {
        name: "Maya Reed",
        role: "Growth Lead",
        company: "APEX",
        avatar: "/avatars/avatar-3.png",
        quote:
            "The AI suggestions are scary good. We shipped optimizations we kept postponing for months.",
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

    // управление с клавиатуры
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // свайп
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
        <Section className="py-14 md:py-20">
            {/* шире обычного контейнера */}
            <div className="mx-auto max-w-[1400px] px-4">
                <div
                    className="testimonial-wrap"
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    <div className="testimonial-card relative px-4 sm:px-6 md:px-10 py-8 md:py-12">
                        {/* стрелки */}
                        <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
                            <button aria-label="Previous" onClick={prev} className="t-arrow pointer-events-auto">
                                <svg viewBox="0 0 24 24" width="20" height="20" className="text-white/85">
                                    <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <button aria-label="Next" onClick={next} className="t-arrow pointer-events-auto">
                                <svg viewBox="0 0 24 24" width="20" height="20" className="text-white/85">
                                    <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>

                        {/* контент — с анимацией направления */}
                        <div
                            key={i}  // ← КЛЮЧ ВАЖЕН!
                            className={`relative grid gap-8 md:gap-10 md:grid-cols-[auto,1fr] items-center
              ${dir === "right" ? "slide-in-right" : "slide-in-left"}`}
                        >
                            {/* аватар */}
                            <div className="justify-self-center md:justify-self-start">
                                <Image
                                    src={t.avatar}
                                    alt={t.name}
                                    width={196}
                                    height={196}
                                    priority
                                    className="rounded-2xl ring-1 ring-white/15"
                                />
                            </div>

                            {/* текст */}
                            <div className="max-w-3xl">
                                <blockquote className="text-white text-xl md:text-2xl leading-[1.35]">
                                    “{t.quote}”
                                </blockquote>
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
                        <span
                            key={idx}
                            className={`h-1.5 rounded-full transition-all ${
                                idx === i ? "w-6 bg-white/85" : "w-3 bg-white/30"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
}