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
    const isFull = (match?.currentPlayers ?? 0) >= (match?.maxPlayers ?? 0);

    {
        /**서버 통신 후 신청 취소 기능 만들어야함 */
    }
    return (
        <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center pb-20">
            <div className="w-full flex-1">
                <div className="flex w-full items-center gap-2">
                    <Link href="/match" aria-label="매치 목록으로 돌아가기">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                    <h1 className="text-xl font-semibold text-black sm:text-2xl">
                        매치 정보
                    </h1>
                </div>
                <section className="mt-4 flex w-full flex-col gap-8">
                    <div className="h-56 w-full overflow-hidden rounded-xl sm:h-64 lg:h-72">
                        <Image
                            src={Stadium}
                            alt="stadium image"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <MatchDetail match={match} />
                </section>
            </div>

            <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
                <div className="mx-auto w-full max-w-4xl">
                    <button
                        className={`w-full rounded-xl px-4 py-3 text-base font-medium text-white ${
                            isFull ? "bg-gray-400" : "bg-black"
                        }`}
                        disabled={isFull}
                    >
                        {isFull ? "마감되었습니다" : "참가 신청하기"}
                    </button>
                </div>
            </div>
        </div>
    );
}
