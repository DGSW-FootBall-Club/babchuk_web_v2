"use client";

import MatchCard from "@/components/home/MatchCard";
import useMatchList from "@/hooks/useMatchList";

export default function UpcomingMatches() {
    const { matches, isLoading, error, refresh } = useMatchList();

    if (isLoading) {
        return <p className="text-sm text-slate-500">매치를 불러오는 중...</p>;
    }

    if (error) {
        return (
            <div className="flex flex-col gap-2 text-sm text-slate-600">
                <p>{error}</p>
                <button
                    type="button"
                    onClick={() => void refresh()}
                    className="self-start font-semibold text-slate-900 underline"
                >
                    다시 시도
                </button>
            </div>
        );
    }

    const upcomingMatches = matches.slice(0, 3);
    if (upcomingMatches.length === 0) {
        return <p className="text-sm text-slate-500">예정된 매치가 없어요.</p>;
    }

    return (
        <div className="flex flex-1 flex-col gap-3">
            {upcomingMatches.map((match) => (
                <MatchCard
                    key={match.id}
                    id={match.id}
                    redteam={match.users.filter((user) => user.team === "A").length}
                    blueteam={match.users.filter((user) => user.team === "B").length}
                    status={match.status}
                    date={match.date}
                    time={match.time}
                />
            ))}
        </div>
    );
}
