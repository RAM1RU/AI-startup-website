"use client";

import Section from "../ui/Section";
import Announcement from "../ui/Announcement";
import Image from "next/image";

export default function Hero() {
    return (
        <Section className="pt-16 md:pt-20">
            {/* Единая карточка с фоном, сеткой и фиолетовыми бликами */}
            <div className="hero-card mx-auto max-w-7xl p-6 md:p-12 lg:p-16 relative">
                {/* 3D-слой с интерактивными кубами поверх фоновой композиции */}
                <div className="hero-3d absolute inset-0 hidden lg:block z-[2]">
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

                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <input className="input-pill w-full sm:w-auto min-w-[220px]" placeholder="Your email" aria-label="Email" />
                            <button className="btn-hero text-sm font-medium">Join waitlist</button>
                        </div>

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