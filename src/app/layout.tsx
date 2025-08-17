import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "AI Startup — Elevate your SEO efforts",
    description: "Dark landing with purple glow built on Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${sora.variable} ${inter.variable}`}>
        <body className="bg-grid-dark bg-stars">{children}</body>
        </html>
    );
}
