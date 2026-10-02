import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import type { ReactNode } from "react";
import Topbar from "@/components/common/Topbar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function DocLayout({ children }: { children: ReactNode }) {
    return (
        <html
            lang="ko"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
            suppressHydrationWarning
        >
            <body className="min-h-full flex flex-col bg-black text-white">
                <Topbar />
                <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:gap-10 lg:px-8 lg:py-10">
                    {children}
                </div>
                <Toaster position="top-right" />
            </body>
        </html>
    );
}
