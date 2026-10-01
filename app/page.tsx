import HoloCard from "@/components/home/HoloCard";
import MatchCard from "@/components/home/MatchCard";
import createMatch from "@/public/create_match.svg";
import viewMatch from "@/public/view_match.png";
import HistoryCard from "@/components/home/HistoryCard";

export default function Home() {
    return (
        <div className="w-full flex flex-col items-center justify-center p-24 gap-12">
            <section className="w-[92%] flex h-180 items-center justify-between">
                <HoloCard
                    title="매치 생성"
                    description="축구 경기를 생성하세요!"
                    image={createMatch}
                    imageAlt="매치 생성"
                />
                <HoloCard
                    title="매치 보기"
                    description="축구 경기에 참가하세요!"
                    image={viewMatch}
                    imageAlt="매치 참가"
                />
                {/**새로 섹션 */}
                <section className="w-100 flex flex-col h-180 gap-4">
                    <h1 className="text-3xl font-bold">다가오는 일정</h1>
                    <div className="h-full flex flex-col justify-between">
                        <MatchCard redteam={10} blueteam={10} status="full" />
                        <MatchCard redteam={10} blueteam={10} status="full" />
                        <MatchCard
                            redteam={10}
                            blueteam={10}
                            status="pending"
                        />
                    </div>
                </section>
            </section>
            <HistoryCard />
        </div>
    );
}
