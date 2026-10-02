import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
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

export const metadata: Metadata = {
    metadataBase: new URL("https://babchuk.app"),
    title: {
        default: "밥축",
        template: "%s | 밥축",
    },
    description:
        "밥축은 축구 매치 생성, 참가, 일정 확인을 한 번에 할 수 있는 스포츠 매칭 서비스입니다.",
    applicationName: "밥축",
    keywords: [
        "밥축",
        "축구 매칭",
        "풋살",
        "매치 생성",
        "축구 일정",
        "스포츠 커뮤니티",
    ],
    authors: [{ name: "밥축 팀" }],
    openGraph: {
        title: "밥축",
        description:
            "축구 매치 생성, 참여, 일정 확인을 손쉽게 관리하는 밥축 서비스",
        siteName: "밥축",
        type: "website",
        locale: "ko_KR",
    },
    twitter: {
        card: "summary_large_image",
        title: "밥축",
        description:
            "축구 매치 생성, 참여, 일정 확인을 손쉽게 관리하는 밥축 서비스",
    },
    icons: {
        icon: [
            { url: "/logo.svg", type: "image/svg+xml" },
            { url: "/logo.svg", type: "image/svg+xml", sizes: "any" },
        ],
        shortcut: ["/logo.svg"],
        apple: ["/logo.svg"],
    },
};

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <html
            lang="ko"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
            suppressHydrationWarning
        >
            <body className="min-h-full flex flex-col bg-[#f5f5f5] text-slate-900">
                <Topbar />
                <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:gap-10 lg:px-8 lg:py-10">
                    {children}
                </div>
                <Toaster position="top-right" />
            </body>
        </html>
    );
}
