import Section from "../ui/Section";
import type { JSX } from "react";

type Feature = {
    title: string;
    desc: string;
    icon: JSX.Element;
};

const features: Feature[] = [
    {
        title: "Realistic Conversations",
        desc: "AI understands context, mood, and responds as if a real person is by your side.",
        icon: (
            <svg viewBox="0 0 24 24" className="size-5">
                <path
                    d="M4 19V5m0 14h16M4 5h16M8 15l3-3 3 2 4-6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        title: "Emotional Support",
        desc: "always ready to listen, encourage, share joy, or comfort you in difficult moments.",
        icon: (
            <svg viewBox="0 0 24 24" className="size-5">
                <path d="M4 18h4V8H4v10zm6 0h4V4h-4v14zm6 0h4v-7h-4v7z" fill="currentColor" />
            </svg>
        ),
    },
    {
        title: "Personalization",
        desc: "adapts to your interests, communication style, and preferences over time.",
        icon: (
            <svg viewBox="0 0 24 24" className="size-5">
                <path
                    d="M12 3v6m0 6v6M3 12h6m6 0h6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    fill="none"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        title: "Visual Presence",
        desc: "beautiful photos/avatars that create the feeling of real companionship.",
        icon: (
            <svg viewBox="0 0 24 24" className="size-5">
                <path
                    d="M9 18l6-12M5 10l4 2 2 4 4 2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    fill="none"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        title: "Always Available",
        desc: "there for you 24/7, anytime and anywhere.",
        icon: (
            <svg viewBox="0 0 24 24" className="size-5">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="none" />
                <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: "Privacy & Security",
        desc: "conversations remain completely private, with no data shared with third parties.",
        icon: (
            <svg viewBox="0 0 24 24" className="size-5">
                <path
                    d="M12 4l7 14H5l7-14zM12 10v3m0 3h.01"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    fill="none"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
];

export default function Features() {
    return (
        <Section id="features" className="py-14 md:py-20">
            <div className="grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                {features.map((f) => (
                    <div key={f.title} className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <span className="text-white/70">{f.icon}</span>
                            <h3 className="text-white font-semibold">{f.title}</h3>
                        </div>
                        <p className="text-white/60 text-[15px] leading-relaxed pl-8">{f.desc}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
}