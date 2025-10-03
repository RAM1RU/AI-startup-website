import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import BackgroundShapes from "@/components/common/BackgroundShapes";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "Amestia — more than AI",
    description: "Not just SMART, Someone who CARES.",
    icons: { icon: "/favicon.ico" }, // хранить favicon в /public/favicon.ico
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${sora.variable} ${inter.variable}`}>
        <body className="relative overflow-x-hidden bg-[#05080f]">
        <BackgroundShapes />
        {children}
        </body>
        </html>
    );
}