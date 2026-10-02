import HoloCard from "@/components/home/HoloCard";
import MatchCard from "@/components/home/MatchCard";
import createMatch from "@/public/create_match.svg";
import viewMatch from "@/public/view_match.png";
import HistoryCard from "@/components/home/HistoryCard";
import { mockMatchList } from "@/lib/mock/matchData";

export default function Home() {
    const upcomingMatches = mockMatchList.slice(0, 3);

    return (
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:gap-10 lg:px-8 lg:py-10">
            <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                <HoloCard
                    title="매치 생성"
                    description="축구 경기를 생성하세요!"
                    image={createMatch}
                    imageAlt="매치 생성"
                    router={"/match/create"}
                />
                <HoloCard
                    title="매치 보기"
                    description="축구 경기에 참가하세요!"
                    image={viewMatch}
                    imageAlt="매치 참가"
                    router={"/match"}
                />
                <section className="flex flex-col gap-4 md:col-span-2 xl:col-span-1">
                    <h1 className="text-2xl font-bold sm:text-3xl">
                        다가오는 일정
                    </h1>
                    <div className="flex flex-1 flex-col gap-3">
                        {upcomingMatches.map((match) => (
                            <MatchCard
                                key={match.id}
                                id={match.id}
                                redteam={
                                    match.users.filter(
                                        (user) => user.team === "A",
                                    ).length
                                }
                                blueteam={
                                    match.users.filter(
                                        (user) => user.team === "B",
                                    ).length
                                }
                                status={match.status}
                                date={match.date}
                                time={match.time}
                            />
                        ))}
                    </div>
                </section>
            </section>
            <HistoryCard />
        </main>
    );
}
