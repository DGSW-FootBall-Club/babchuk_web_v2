import Link from "next/link";
import { mockMatchList } from "@/lib/mock/matchData";

export default function Match() {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-full flex items-center justify-between">
                <h1 className="text-2xl font-bold text-black">
                    현재 있는 매치들
                </h1>
            </div>

            <div className="w-full space-y-3">
                {mockMatchList.map((match) => (
                    <Link
                        key={match.id}
                        href={`/match/${match.id}`}
                        className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-lg font-semibold text-black">
                                    {match.title}
                                </p>
                                <p className="text-sm text-slate-500">
                                    {match.date} · {match.time}
                                </p>
                            </div>
                            <span
                                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                    match.status === "full"
                                        ? "bg-red-500 text-white"
                                        : "bg-emerald-500 text-white"
                                }`}
                            >
                                {match.status === "full" ? "마감" : "신청 가능"}
                            </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
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
