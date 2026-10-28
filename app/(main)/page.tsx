import HoloCard from "@/components/home/HoloCard";
import UpcomingMatches from "@/components/home/UpcomingMatches";
import createMatch from "@/public/create_match.svg";
import viewMatch from "@/public/view_match.png";
import HistoryCard from "@/components/home/HistoryCard";

export default function Home() {
    return (
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-0 sm:gap-8">
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
                    <h1 className="text-xl font-bold sm:text-2xl xl:text-3xl">
                        다가오는 일정
                    </h1>
                    <UpcomingMatches />
                </section>
            </section>
            <HistoryCard />
        </main>
    );
}
