"use client";
import { useState } from "react";
import clsx from "clsx";

const plans = [
    {
        name: "Basic",
        price: "$29",
        features: [
            "Keyword optimization: Unlimited",
            "Automated meta tags: 1000",
            "SEO Monitoring",
            "Monthly reports",
        ],
    },
    {
        name: "Pro",
        price: "$79",
        features: [
            "Keyword optimization: Unlimited",
            "Automated meta tags: Unlimited",
            "SEO Monitoring",
            "Monthly reports",
            "Content suggestions",
            "Link optimization",
        ],
        popular: true,
    },
    {
        name: "Business",
        price: "$149",
        features: [
            "Keyword optimization: Unlimited",
            "Automated meta tags: Unlimited",
            "SEO Monitoring",
            "Monthly reports",
            "Content suggestions",
            "Link optimization",
            "Multi-user access",
            "API Integration",
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
                {plans.map((plan, idx) => (
                    <div
                        key={plan.name}
                        onMouseEnter={() => setHovered(idx)}
                        onMouseLeave={() => setHovered(null)}
                        className={clsx(
                            "rounded-xl p-8 border border-white/10 bg-black/40 backdrop-blur transition-all duration-500 cursor-pointer relative flex flex-col", // flex col
                            hovered === idx
                                ? "bg-gradient-to-b from-violet-700/40 to-violet-900/30 shadow-[0_0_40px_rgba(139,92,246,0.7)] scale-[1.03]"
                                : "hover:bg-violet-800/10"
                        )}
                    >
                        {plan.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-600 text-xs font-medium px-3 py-1 rounded-full shadow-lg">
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

                        {/* кнопка всегда внизу */}
                        <button
                            className={clsx(
                                "mt-8 w-full py-2 rounded-lg font-medium transition-colors",
                                hovered === idx
                                    ? "bg-violet-600 hover:bg-violet-500"
                                    : "bg-white/10 hover:bg-white/20"
                            )}
                        >
                            Get Started
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}