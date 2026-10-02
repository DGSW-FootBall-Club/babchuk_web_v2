"use client";

import MatchDetail from "@/components/match/MatchDetail";
import Stadium from "@/public/stadium.svg";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useMatch from "@/hooks/useMatch";
import { usePathname } from "next/navigation";

export default function Match() {
    const pathname = usePathname();
    const id = pathname.split("/").filter(Boolean).at(-1) ?? "";
    const { match } = useMatch(id);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full flex items-center gap-2">
                <Link href="/match" aria-label="매치 목록으로 돌아가기">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-semibold text-black">매치 정보</h1>
            </div>
            <section className="flex flex-col w-full mt-4 gap-8">
                <div className="w-full h-70">
                    <Image
                        src={Stadium}
                        alt="stadium image"
                        className="inset-0 w-full h-full object-cover rounded-xl"
                    />
                </div>
                <MatchDetail match={match} />
            </section>
        </div>
    );
}
