import Link from "next/link";
import { mockMatchList } from "@/lib/mock/matchData";
import { ArrowLeft } from "lucide-react";

export default function Match() {
    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-4">
            <div className="w-full flex items-center gap-2">
                <Link href="/" aria-label="매치 목록으로 돌아가기">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold text-black sm:text-2xl">
                    현재 있는 매치들
                </h1>
            </div>

            <div className="w-full space-y-3">
                {mockMatchList.map((match) => (
                    <Link
                        key={match.id}
                        href={`/match/${match.id}`}
                        className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
                    >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0">
                                <p className="truncate text-base font-semibold text-black sm:text-lg">
                                    {match.title}
                                </p>
                                <p className="text-sm text-slate-500">
                                    {match.date} · {match.time}
                                </p>
                            </div>
                            <span
                                className={`self-start rounded-full px-2.5 py-1 text-xs font-semibold sm:self-auto ${
                                    match.status === "full"
                                        ? "bg-red-500 text-white"
                                        : "bg-emerald-500 text-white"
                                }`}
                            >
                                {match.status === "full" ? "마감" : "신청 가능"}
                            </span>
                        </div>

                        <div className="mt-3 flex flex-col gap-1 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
                            <span>
                                인원: {match.currentPlayers}/{match.maxPlayers}
                            </span>
                            <span>작성자: {match.author.name}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
