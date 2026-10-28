"use client";

import MatchCard from "@/components/home/MatchCard";
import useMatchList from "@/hooks/useMatchList";

export default function UpcomingMatches() {
    const { matches, isLoading, error, refresh } = useMatchList();

    return (
        <div className="flex flex-1 flex-col gap-3">
            {isLoading ? (
                Array.from({ length: 3 }, (_, index) => (
                    <div
                        key={index}
                        aria-hidden="true"
                        className="flex min-h-32 items-center justify-between gap-2 rounded-lg bg-white p-4 shadow-md sm:gap-4 sm:p-5"
                    >
                        <div className="h-16 flex-1 animate-pulse rounded-lg bg-slate-100" />
                        <div className="h-10 flex-1 animate-pulse rounded-lg bg-slate-100" />
                        <div className="h-16 flex-1 animate-pulse rounded-lg bg-slate-100" />
                    </div>
                ))
            ) : error ? (
                <div className="rounded-lg bg-white p-4 text-sm text-slate-600 shadow-md sm:p-5">
                    <p>{error}</p>
                    <button
                        type="button"
                        onClick={() => void refresh()}
                        className="mt-2 font-semibold text-slate-900 underline"
                    >
                        다시 시도
                    </button>
                </div>
            ) : matches.length === 0 ? (
                <div className="rounded-lg bg-white p-4 text-sm text-slate-500 shadow-md sm:p-5">
                    예정된 매치가 없어요.
                </div>
            ) : (
                matches.slice(0, 3).map((match) => (
                    <MatchCard
                        key={match.id}
                        id={match.id}
                        redteam={
                            match.users.filter((user) => user.team === "A")
                                .length
                        }
                        blueteam={
                            match.users.filter((user) => user.team === "B")
                                .length
                        }
                        status={match.status}
                        date={match.date}
                        time={match.time}
                    />
                ))
            )}
        </div>
    );
}
