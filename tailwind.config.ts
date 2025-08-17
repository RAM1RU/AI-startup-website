import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",        // у тебя код в src/*
        "./app/**/*.{js,ts,jsx,tsx,mdx}",        // на всякий случай
        "./components/**/*.{js,ts,jsx,tsx,mdx}", // на всякий случай
    ],
    theme: {
        container: { center: true, padding: "1rem", screens: { "2xl": "1280px" } },
        extend: {
            fontFamily: {
                display: ["var(--font-sora)"],
                sans: ["var(--font-inter)"],
            },
            colors: {
                bg: { DEFAULT: "#0B0B0F", muted: "#0F1016", card: "#11121A" },
                brand: { DEFAULT: "#7C3AED", 300: "#C084FC", 400: "#A855F7", 600: "#7E22CE" },
            },
            borderRadius: { xl: "1rem", "2xl": "1.25rem" },
            boxShadow: {
                glow: "0 0 0 1px rgba(124,58,237,.35), 0 10px 40px rgba(124,58,237,.25)",
                card: "0 8px 30px rgba(0,0,0,.35)",
            },
            backgroundImage: {
                "grid-dark":
                    "radial-gradient(1200px 600px at 50% -10%, rgba(124,58,237,.25), rgba(124,58,237,0) 60%), radial-gradient(800px 400px at 80% 20%, rgba(124,58,237,.18), rgba(124,58,237,0) 60%), radial-gradient(600px 300px at 20% 30%, rgba(168,85,247,.14), rgba(168,85,247,0) 60%), linear-gradient(#0B0B0F,#0B0B0F), repeating-linear-gradient(0deg, rgba(255,255,255,.04) 0 1px, transparent 1px 80px), repeating-linear-gradient(90deg, rgba(255,255,255,.04) 0 1px, transparent 1px 80px)",
            },
        },
    },
    plugins: [],
} satisfies Config;
