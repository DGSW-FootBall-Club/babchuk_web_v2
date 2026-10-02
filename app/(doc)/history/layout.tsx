import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import type { ReactNode } from "react";
import logoWhite from "@/public/logo_white.svg";
import Image from "next/image";
import Link from "next/link";
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
            className={`${geistSans.variable} ${geistMono.variable} history-scroll h-full antialiased`}
            suppressHydrationWarning
        >
            <body className="min-h-full flex flex-col bg-black text-white">
                <header className="sticky top-0 z-50 h-16 w-full bg-black sm:h-20">
                    <div className="mx-auto grid h-full w-full max-w-7xl grid-cols-3 items-center px-4 sm:px-6 lg:px-8">
                        <div />
                        <Link
                            href="/"
                            aria-label="밥축 홈으로 이동"
                            className="flex justify-center"
                        >
                            <Image
                                src={logoWhite}
                                alt="밥축 로고"
                                width={140}
                                height={48}
                                className="h-9 w-auto sm:h-12"
                            />
                        </Link>
                    </div>
                </header>
                <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:gap-10 lg:px-8 lg:py-10">
                    {children}
                </div>
                <Toaster position="top-right" />
            </body>
        </html>
    );
}
