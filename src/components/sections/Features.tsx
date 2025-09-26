import Section from "../Section";
import React, {JSX} from "react";

type Feature = {
    title: string;
    desc: string;
    icon: JSX.Element;
};

const features: Feature[] = [
    {
        title: "Visual reports",
        desc: "Visual insights into your site’s performance.",
        icon: (
            <svg viewBox="0 0 24 24" className="size-5">
                <path
                    d="M4 19V5m0 14h16M4 5h16M8 15l3-3 3 2 4-6"
                    stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        title: "SEO goal setting",
        desc: "Helps you set and achieve SEO goals with guided assistance.",
        icon: (
            <svg viewBox="0 0 24 24" className="size-5">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="none" />
                <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: "One-click optimization",
        desc: "Perform complex SEO audits and optimizations with a single click.",
        icon: (
            <svg viewBox="0 0 24 24" className="size-5">
                <path d="M12 3v6m0 6v6M3 12h6m6 0h6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: "Smart Keyword Generator",
        desc: "Automatic suggestions and the best keywords to target.",
        icon: (
            <svg viewBox="0 0 24 24" className="size-5">
                <path d="M9 18l6-12M5 10l4 2 2 4 4 2" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: "Automated alerts",
        desc: "Automatic notifications about your SEO health, including quick fixes.",
        icon: (
            <svg viewBox="0 0 24 24" className="size-5">
                <path d="M12 4l7 14H5l7-14zM12 10v3m0 3h.01" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: "Competitor reports",
        desc: "Provides insights into competitors’ keyword strategies and ranking.",
        icon: (
            <svg viewBox="0 0 24 24" className="size-5">
                <path d="M4 18h4V8H4v10zm6 0h4V4h-4v14zm6 0h4v-7h-4v7z" fill="currentColor" />
            </svg>
        ),
    },
];

export default function Features() {
    return (
        <Section className="py-14 md:py-20">
            <div className="container">
                {/* grid 3×2 на десктопе, 1×6 на мобиле */}
                <div className="grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((f) => (
                        <div key={f.title} className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <span className="text-white/70">{f.icon}</span>
                                <h3 className="text-white font-semibold">{f.title}</h3>
                            </div>
                            <p className="text-white/60 text-[15px] leading-relaxed pl-8">
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}