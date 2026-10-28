"use client";

import Image from "next/image";
import Link from "next/link";
import { getMyMatchHistory } from "@/lib/api/match";
import { useProfileStore } from "@/stores/profileStore";
import type { Match, MyMatchHistory } from "@/types/match.type";
import { useEffect, useState } from "react";

function getResultLabel(match: Match) {
    if (!match.result) return "결과 미입력";
    if (match.result === "DRAW") return "무승부";

    return match.result === "A_WIN" ? "A팀 승리" : "B팀 승리";
}

function MatchList({
    matches,
    emptyMessage,
}: {
    matches: Match[];
    emptyMessage: string;
}) {
    if (matches.length === 0) {
        return <p className="text-sm text-slate-500">{emptyMessage}</p>;
    }

    return (
        <ul className="flex flex-col gap-3">
            {matches.map((match) => (
                <li key={match.id}>
                    <Link
                        href={`/match/${match.id}`}
                        className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-4 transition hover:bg-slate-50"
                    >
                        <span className="min-w-0">
                            <span className="block truncate font-semibold text-slate-900">
                                {match.title}
                            </span>
                            <span className="mt-1 block text-sm text-slate-500">
                                {match.date} · {match.time}
                            </span>
                        </span>
                        <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                            {getResultLabel(match)}
                        </span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default function ProfilePage() {
    const profile = useProfileStore((state) => state.profile);
    const isProfileLoading = useProfileStore((state) => state.isLoading);
    const profileError = useProfileStore((state) => state.error);
    const [history, setHistory] = useState<MyMatchHistory | null>(null);
    const [isHistoryLoading, setIsHistoryLoading] = useState(true);
    const [historyError, setHistoryError] = useState<string | null>(null);
    const [retry, setRetry] = useState(0);

    useEffect(() => {
        if (!profile) return;
        let isActive = true;

        getMyMatchHistory()
            .then((result) => {
                if (isActive) setHistory(result);
            })
            .catch((error: unknown) => {
                console.error("[Profile] Failed to load match history:", error);
                if (isActive) {
                    setHistoryError(
                        error instanceof Error
                            ? error.message
                            : "매치 기록을 불러오지 못했어요.",
                    );
                }
            })
            .finally(() => {
                if (isActive) setIsHistoryLoading(false);
            });

        return () => {
            isActive = false;
        };
    }, [profile, retry]);

    if (!profile) {
        return (
            <main className="mx-auto w-full max-w-3xl">
                <h1 className="text-2xl font-bold">프로필</h1>
                <p className="mt-4 text-slate-600">
                    {isProfileLoading
                        ? "프로필을 불러오는 중입니다..."
                        : profileError
                          ? "프로필을 불러오지 못했어요."
                          : "프로필 정보가 없습니다."}
                </p>
            </main>
        );
    }

    return (
        <main className="mx-auto w-full max-w-3xl pb-12">
            <h1 className="text-2xl font-bold">프로필</h1>
            <section className="mt-6 flex items-center gap-4 rounded-xl bg-white p-6 shadow-sm">
                {profile.profileImage && (
                    <Image
                        src={profile.profileImage}
                        alt="프로필 이미지"
                        width={100}
                        height={100}
                        unoptimized
                        className="h-20 w-20 rounded-full object-cover"
                    />
                )}
                <div>
                    <p className="text-lg font-semibold">{profile.name}</p>
                    <p className="text-slate-600">@{profile.username}</p>
                </div>
            </section>

            <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900">경기 전적</h2>
                {isHistoryLoading && !history ? (
                    <p className="mt-4 text-sm text-slate-500">
                        경기 기록을 불러오는 중...
                    </p>
                ) : historyError ? (
                    <div className="mt-4 flex flex-col items-start gap-3">
                        <p className="text-sm text-red-600">{historyError}</p>
                        <button
                            type="button"
                            onClick={() => {
                                setHistoryError(null);
                                setIsHistoryLoading(true);
                                setRetry((value) => value + 1);
                            }}
                            className="text-sm font-semibold underline"
                        >
                            다시 시도
                        </button>
                    </div>
                ) : history ? (
                    <>
                        <p className="mt-2 text-sm text-slate-600">
                            참가한 경기 {history.participatedMatches.length}경기
                        </p>
                        <div className="mt-4 grid grid-cols-3 gap-3">
                            {[
                                {
                                    label: "승리",
                                    value: history.stats.wins,
                                    style: "text-emerald-700",
                                },
                                {
                                    label: "패배",
                                    value: history.stats.losses,
                                    style: "text-red-700",
                                },
                                {
                                    label: "무승부",
                                    value: history.stats.draws,
                                    style: "text-slate-700",
                                },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-lg bg-slate-50 p-4 text-center"
                                >
                                    <p className="text-sm text-slate-500">
                                        {stat.label}
                                    </p>
                                    <p
                                        className={`mt-1 text-2xl font-bold ${stat.style}`}
                                    >
                                        {stat.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="mt-4 text-sm text-slate-500">
                        경기 기록이 없습니다.
                    </p>
                )}
            </section>

            {history && (
                <>
                    <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900">
                            참가 중인 경기
                        </h2>
                        <div className="mt-4">
                            <MatchList
                                matches={history.currentMatches}
                                emptyMessage="참가 중인 경기가 없습니다."
                            />
                        </div>
                    </section>
                    <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900">
                            참가한 경기
                        </h2>
                        <div className="mt-4">
                            <MatchList
                                matches={history.participatedMatches}
                                emptyMessage="완료된 경기가 없습니다."
                            />
                        </div>
                    </section>
                </>
            )}
        </main>
    );
}
