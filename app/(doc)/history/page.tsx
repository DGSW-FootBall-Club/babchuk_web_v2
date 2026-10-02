import dgsw1 from "@/public/dgsw1.svg";
import dgsw2 from "@/public/dgsw2.jpeg";
import dgsw3 from "@/public/dgsw3.jpeg";
import HistoryGalleryItem from "@/components/history/HistoryGalleryItem";

const historyItems = [
    {
        image: dgsw1,
        title: "2025년 대소고 FC 8기 졸업식 사진",
        subtitle: "졸업자: 김호준, 서영우",
    },
    {
        image: dgsw2,
        title: "2026년 대소고 FC 벚꽃 콘테스트 사진",
        subtitle: "9기, 10기, 11기",
    },
    {
        image: dgsw3,
        title: "2026년 대소고 FC 축신짤 사진",
        subtitle:
            "축신짤 사진은 축신짤 사진이며, 동경호의 감아차기를 보여준다.",
    },
];

export default function History() {
    return (
        <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-0 sm:gap-8">
            <section className="flex w-full flex-col gap-3">
                <p className="text-xl font-bold leading-7 text-slate-200 sm:text-2xl">
                    대소고 FC는 2025년 3월부터 시작해 운영되고 있는 스포츠
                    동아리입니다.
                </p>
                <p className="text-base leading-7 text-slate-200 sm:text-lg">
                    현재까지도 대소고에서 가장 사랑받고 인기 많은 동아리 TOP 1을
                    지키고 있습니다.
                </p>
            </section>

            <section className="flex w-full flex-col gap-4">
                {historyItems.map((item) => (
                    <HistoryGalleryItem
                        key={item.title}
                        image={item.image}
                        title={item.title}
                        subtitle={item.subtitle}
                    />
                ))}
            </section>
        </main>
    );
}
