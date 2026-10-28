import Image from "next/image";
import Link from "next/link";
import type { Match, MyMatchHistory } from "@/types/match.type";
import type { Profile } from "@/types/user.type";

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

type ProfileContentProps = {
    profile: Profile;
    history: MyMatchHistory | null;
    isLoading: boolean;
    error: string | null;
    onRetry: () => void;
};

export default function ProfileContent({
    profile,
    history,
    isLoading,
    error,
    onRetry,
}: ProfileContentProps) {
    const completedMatches = history
        ? history.stats.wins + history.stats.losses + history.stats.draws
        : 0;
    const winRate =
        history && completedMatches > 0
            ? ((history.stats.wins / completedMatches) * 100).toFixed(1)
            : "0.0";

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
                {isLoading && !history ? (
                    <p className="mt-4 text-sm text-slate-500">
                        경기 기록을 불러오는 중...
                    </p>
                ) : error ? (
                    <div className="mt-4 flex flex-col items-start gap-3">
                        <p className="text-sm text-red-600">{error}</p>
                        <button
                            type="button"
                            onClick={onRetry}
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
                        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
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
                                {
                                    label: "승률",
                                    value: `${winRate}%`,
                                    style: "text-blue-700",
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
