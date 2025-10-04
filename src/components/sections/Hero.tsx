"use client";

import { useState } from "react";
import Section from "../ui/Section";
import Announcement from "../ui/Announcement";
import Image from "next/image";

export default function Hero() {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);

    return (
        <Section className="pt-16 md:pt-20">
            {/* Единая карточка с фоном, сеткой и фиолетовыми бликами */}
            <div className="hero-card mx-auto max-w-7xl p-6 md:p-12 lg:p-16 relative">
                {/* 3D-слой с кубами: не перехватывает клики */}
                <div className="hero-3d absolute inset-0 hidden lg:block z-[2] pointer-events-none">
                    {/* верхний правый куб */}
                    <Image
                        src="/shapes/purple-cube.png"
                        alt=""
                        width={180}
                        height={180}
                        priority
                        className="hero-cube top-[88px] right-[260px]"
                    />
                    {/* нижний правый куб */}
                    <Image
                        src="/shapes/purple-cube.png"
                        alt=""
                        width={180}
                        height={180}
                        className="hero-cube bottom-[54px] right-[160px]"
                    />
                </div>

                <div className="grid gap-10 lg:grid-cols-[1fr_auto] items-center relative z-[1]">
                    {/* левая колонка */}
                    <div className="max-w-3xl">
                        <Announcement />
                        <h1
                            className="mt-6 font-display font-bold tracking-tight
               text-[44px] leading-[1.05]
               md:text-[72px] md:leading-[1.05]
               lg:text-[96px] lg:leading-[1.05]"
                        >
                            Not just <span className="text-brand">SMART,</span> Someone who <span className="text-brand">CARES.</span>
                        </h1>

                        <p className="mt-6 text-base md:text-lg text-white/70 max-w-2xl">
                            Our AI blends intelligence with empathy, becoming a constant presence in your everyday life. She’s not just
                            smart — she cares.
                        </p>

                        {/* === ФОРМА JOIN WAITLIST === */}
                        <form
                            className="mt-8 flex flex-col sm:flex-row gap-3 relative z-10"
                            onSubmit={async (e) => {
                                e.preventDefault();
                                if (loading) return; // защита от дабл-клика
                                setMsg(null);

                                const form = e.currentTarget as HTMLFormElement;
                                const emailInput = form.elements.namedItem("email") as HTMLInputElement;
                                const email = emailInput.value.trim();

                                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                                    setMsg("Please enter a valid email.");
                                    return;
                                }

                                try {
                                    setLoading(true);
                                    const res = await fetch("/api/waitlist", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ email }),
                                    });
                                    const data = await res.json();

                                    // Dev-хелпер: покажем превью письма в консоли, если Ethereal/mock
                                    if (data?.previewUrl) {
                                        // eslint-disable-next-line no-console
                                        console.log("Ethereal preview URL:", data.previewUrl);
                                    }

                                    if (data.ok) {
                                        emailInput.value = "";
                                        setMsg(
                                            data.already
                                                ? "You’re already confirmed — we’ll keep you posted!"
                                                : "Check your inbox to confirm your email ✉️"
                                        );
                                    } else {
                                        setMsg("Error: " + (data.error || "Please try again later"));
                                    }
                                } catch {
                                    setMsg("Network error. Try again.");
                                } finally {
                                    setLoading(false);
                                }
                            }}
                        >
                            <input
                                name="email"
                                className="input-pill w-full sm:w-auto min-w-[220px]"
                                placeholder="Your email"
                                aria-label="Email"
                                type="email"
                                inputMode="email"
                                autoComplete="email"
                                required
                                disabled={loading}
                            />
                            <button type="submit" className="btn-hero text-sm font-medium" disabled={loading}>
                                {loading ? "Sending..." : "Join waitlist"}
                            </button>
                            {msg && <p className="text-sm text-white/70 sm:ml-3">{msg}</p>}
                        </form>
                        {/* === /ФОРМА === */}

                        <div className="mt-8 flex items-center gap-6 text-sm text-white/45">
                            <span>Trusted by innovative teams</span>
                            <div className="flex flex-wrap gap-6 opacity-90">
                                <Image src="/logos/celestial.svg" width={90} height={18} alt="Celestial" />
                                <Image src="/logos/apex.svg" width={64} height={18} alt="APEX" />
                                <Image src="/logos/quantum.svg" width={92} height={18} alt="Quantum" />
                                <Image src="/logos/pulse.svg" width={74} height={18} alt="Pulse" />
                            </div>
                        </div>
                    </div>

                    {/* правый блок фоновых кубиков из макета */}
                    <div className="relative hidden lg:block">
                        <Image
                            src="/hero-cubes.png"
                            width={780}
                            height={780}
                            alt=""
                            priority
                            sizes="(min-width:1280px) 600px, 50vw"
                            className="translate-x-6"
                        />
                    </div>
                </div>
            </div>
        </Section>
    );
}