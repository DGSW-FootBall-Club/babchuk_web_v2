"use client";

import MatchDetail from "@/components/match/MatchDetail";
import { mockMatches } from "@/lib/mock/matchData";
import type { Match } from "@/types/match.type";
import Stadium from "@/public/stadium.svg";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

type MatchResource = {
    status: "pending" | "resolved";
    promise?: Promise<Match | null>;
    result?: Match | null;
};

const matchResourceMap = new Map<string, MatchResource>();

function readMatch(id: string): Match | null {
    if (!id) {
        return null;
    }

    let resource = matchResourceMap.get(id);

    if (!resource) {
        resource = {
            status: "pending",
            promise: Promise.resolve().then(() => {
                const match =
                    mockMatches.find((item) => item.id === id) ?? null;
                resource!.status = "resolved";
                resource!.result = match;
                return match;
            }),
        };
        matchResourceMap.set(id, resource);
    }

    if (resource.status === "pending") {
        throw resource.promise;
    }

    return resource.result ?? null;
}

function MatchPageSkeleton() {
    return (
        <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center pb-20">
            <div className="w-full flex-1">
                <div className="flex w-full items-center gap-2">
                    <div className="h-6 w-6 animate-pulse rounded bg-slate-200" />
                    <div className="h-6 w-28 animate-pulse rounded bg-slate-200" />
                </div>
                <section className="mt-4 flex w-full flex-col gap-8">
                    <div className="h-56 w-full animate-pulse rounded-xl bg-slate-200 sm:h-64 lg:h-72" />
                    <div className="flex w-full flex-col gap-4 rounded-xl bg-white p-4 sm:p-5">
                        <div className="h-7 w-2/3 animate-pulse rounded bg-slate-200" />
                        <div className="h-16 w-full animate-pulse rounded-lg bg-slate-100" />
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <div className="h-24 animate-pulse rounded-lg bg-slate-100" />
                            <div className="h-24 animate-pulse rounded-lg bg-slate-100" />
                        </div>
                    </div>
                </section>
            </div>

            <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
                <div className="mx-auto w-full max-w-4xl">
                    <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200" />
                </div>
            </div>
        </div>
    );
}

function MatchPageContent({ id }: { id: string }) {
    const match = readMatch(id);
    const [isJoining, setIsJoining] = useState(false);
    const isFull = (match?.currentPlayers ?? 0) >= (match?.maxPlayers ?? 0);

    const handleJoinMatch = async () => {
        if (!match) {
            toast.error("매치 정보를 불러오지 못했습니다.");
            return;
        }

        if (isFull) {
            toast.error("마감된 매치는 신청할 수 없습니다.");
            return;
        }

        setIsJoining(true);

        try {
            const nextPlayers = match.currentPlayers + 1;
            const nextMatch: Match = {
                ...match,
                currentPlayers: nextPlayers,
                status: nextPlayers >= match.maxPlayers ? "full" : "pending",
            };

            const index = mockMatches.findIndex((item) => item.id === match.id);
            if (index >= 0) {
                mockMatches[index] = nextMatch;
            }

            matchResourceMap.set(id, {
                status: "resolved",
                result: nextMatch,
            });

            toast.success("참가 신청이 완료되었습니다.");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "참가 신청에 실패했습니다.",
            );
        } finally {
            setIsJoining(false);
        }
    };

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
                        disabled={isFull || isJoining}
                        onClick={handleJoinMatch}
                    >
                        {isJoining
                            ? "신청 중..."
                            : isFull
                              ? "마감되었습니다"
                              : "참가 신청하기"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Match() {
    const pathname = usePathname();
    const id = pathname.split("/").filter(Boolean).at(-1) ?? "";

    return (
        <Suspense fallback={<MatchPageSkeleton />}>
            <MatchPageContent id={id} />
        </Suspense>
    );
}
