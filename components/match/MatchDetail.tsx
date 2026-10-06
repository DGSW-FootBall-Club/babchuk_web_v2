import type { Match } from "@/types/match.type";

type MatchDetailProps = {
    match: Match | null;
};

export default function MatchDetail({ match }: MatchDetailProps) {
    const teamAUsers = match?.users.filter((user) => user.team === "A") ?? [];
    const teamBUsers = match?.users.filter((user) => user.team === "B") ?? [];

    return (
        <div className="flex w-full flex-col gap-4 rounded-xl bg-white p-4 text-white sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-bold text-black sm:text-2xl">
                    {match?.title ?? "매치 정보 불러오는 중..."}
                </h2>
                <span
                    className={`self-start rounded-full px-2.5 py-1 text-xs font-semibold ${
                        match?.status === "full"
                            ? "bg-red-500 text-white"
                            : "bg-emerald-500 text-white"
                    }`}
                >
                    {match?.status === "full" ? "신청 마감" : "신청 가능"}
                </span>
            </div>

            <div className="flex flex-col gap-2 rounded-lg bg-slate-100 p-4">
                {!match ? (
                    <p className="text-sm text-slate-300">
                        매치 정보를 불러오고 있습니다.
                    </p>
                ) : (
                    <>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-slate-500">날짜</span>
                            <p className="text-base text-black">
                                {match.date}일 {match.time}
                            </p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-slate-500">
                                현재 인원
                            </span>
                            <p className="text-base text-black">
                                {match.currentPlayers}/{match.maxPlayers}
                            </p>
                        </div>
                    </>
                )}
            </div>

            <div className="mt-2 rounded-lg p-1 sm:p-3">
                <p className="text-sm font-semibold text-black">참여 인원</p>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="rounded-lg p-2 sm:p-3">
                        <p className="mb-2 text-sm font-semibold text-red-500">
                            A 팀
                        </p>
                        <ul className="space-y-2">
                            {teamAUsers.length ? (
                                teamAUsers.map((user) => (
                                    <li
                                        key={user.username}
                                        className="flex flex-col gap-1 rounded-md py-2 text-sm sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <span className="font-bold text-black">
                                            {user.name}
                                        </span>
                                        <span className="text-gray-700">
                                            {user.username}
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <li className="text-sm text-gray-600">
                                    A팀 인원이 없습니다.
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className="rounded-lg p-2 text-sm sm:p-3">
                        <p className="mb-2 text-sm font-semibold text-blue-500">
                            B 팀
                        </p>
                        <ul className="space-y-2">
                            {teamBUsers.length ? (
                                teamBUsers.map((user) => (
                                    <li
                                        key={user.username}
                                        className="flex flex-col gap-1 rounded-md py-2 text-sm sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <span className="font-bold text-black">
                                            {user.name}
                                        </span>
                                        <span className="text-slate-700">
                                            {user.username}
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <li className="text-sm text-gray-600">
                                    B팀 인원이 없습니다.
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
