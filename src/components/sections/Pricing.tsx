"use client";
import { useState } from "react";
import clsx from "clsx";

const plans = [
    {
        name: "Basic",
        price: "$5.99",
        features: [
            "Unlimited text chat with your AI companion",
            "Basic personalization (name, simple preferences)",
            "Standard avatars/photos",
            "Available 24/7",
            "Secure & private conversations",
        ],
    },
    {
        name: "Pro",
        price: "$15.99",
        features: [
            "Everything in Basic, plus:",
            "Advanced personalization (interests, memory of past chats, mood adaptation)",
            "Access to premium avatars & photo packs",
            "Early access to voice messages (AI-generated voice replies)",
            "Priority response speed",
            "Weekly “mood journal” with AI insights",
        ],
        popular: true,
    },
    {
        name: "Business",
        price: "$25.99",
        features: [
            "Everything in Pro, plus:",
            "Full visual experience (exclusive realistic avatars, “girlfriend/best friend” style packs)",
            "Real-time voice conversations (not just messages)",
            "Custom personality settings (choose character traits, style of communication)",
            "Shared activities (games, quizzes, virtual date modes)",
            "Beta access to VR/AR features",
            "Direct priority support + special updates before others",
        ],
    },
];

export default function Pricing() {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <section className="py-24 relative">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold">Pricing</h2>
                <p className="mt-3 text-white/70">
                    Choose the right plan to meet your SEO needs and start optimizing today.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {plans.map((plan, idx) => {
                    const active = hovered === idx;
                    return (
                        <div
                            key={plan.name}
                            onMouseEnter={() => setHovered(idx)}
                            onMouseLeave={() => setHovered(null)}
                            onTouchStart={() => setHovered(idx)}   // для тач-устройств
                            onTouchEnd={() => setHovered(null)}
                            className={clsx(
                                "pricing-card",                            // <-- важно
                                "relative flex flex-col h-full rounded-2xl p-8",
                                "border border-white/10 bg-black/40 backdrop-blur",
                                "transition-all duration-500 cursor-pointer overflow-hidden",
                                active
                                    ? "is-active shadow-[0_0_30px_rgba(139,92,246,0.7),0_0_60px_rgba(124,58,237,0.5)] scale-[1.02]"
                                    : "hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]"
                            )}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-600 text-xs font-medium px-3 py-1 rounded-full shadow-lg z-10">
                                    Most Popular
                                </div>
                            )}

                            <div className="flex-grow">
                                <h3 className="text-xl font-semibold">{plan.name}</h3>
                                <p className="mt-2 text-3xl font-bold">{plan.price}</p>

                                <ul className="mt-6 space-y-3 text-sm text-white/70">
                                    {plan.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2">
                                            <span className="text-violet-400">✔</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* кнопка всегда внизу, на одном уровне у всех */}
                            <button
                                className={clsx(
                                    "mt-8 w-full py-2 rounded-lg font-medium transition-colors",
                                    active ? "bg-violet-600 hover:bg-violet-500" : "bg-white/10 hover:bg-white/20"
                                )}
                            >
                                Get Started
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}