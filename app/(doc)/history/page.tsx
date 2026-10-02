import dgsw1 from "@/public/dgsw1.svg";
import dgsw2 from "@/public/dgsw2.jpeg";
import dgsw3 from "@/public/dgsw3.jpeg";
import HistoryGalleryItem from "@/components/history/HistoryGalleryItem";
import ScrollReveal from "@/components/history/ScrollReveal";

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

const historySections = [
    { id: "history-intro", number: "01", label: "소개글" },
    { id: "history-members", number: "02", label: "멤버" },
    { id: "history-leader", number: "03", label: "부장" },
    { id: "history-gallery", number: "04", label: "활동 사진" },
];

export default function History() {
    return (
        <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
            <aside className="history-intro-enter lg:sticky lg:top-24 lg:h-fit lg:self-start">
                <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                    차례
                </p>
                <nav
                    aria-label="역사 페이지 차례"
                    className="mt-3 flex max-w-full gap-2 overflow-x-auto border-b border-white/15 pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:border-b-0 lg:border-l lg:pb-0 lg:pl-4"
                >
                    {historySections.map((section) => (
                        <a
                            key={section.id}
                            href={`#${section.id}`}
                            className="flex shrink-0 items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            <span className="text-xs text-slate-500">
                                {section.number}
                            </span>
                            {section.label}
                        </a>
                    ))}
                </nav>
            </aside>

            <div className="flex min-w-0 flex-col gap-16 sm:gap-20">
                <section
                    id="history-intro"
                    className="history-intro-enter scroll-mt-24"
                >
                    <h1 className="mb-5 text-3xl font-bold text-white sm:text-4xl">
                        소개글
                    </h1>
                    <div className="flex flex-col gap-3">
                        <p className="text-xl font-bold leading-7 text-slate-200 sm:text-2xl">
                            대소고 FC는 2025년 3월부터 시작해 운영되고 있는
                            스포츠 동아리입니다.
                        </p>
                        <p className="text-base leading-7 text-slate-200 sm:text-lg">
                            현재까지도 대소고에서 가장 사랑받고 인기 많은 동아리
                            TOP 1을 지키고 있습니다.
                        </p>
                    </div>
                </section>

                <ScrollReveal>
                    <section
                        id="history-members"
                        className="scroll-mt-24 border-t border-white/15 pt-8"
                    >
                        <h2 className="mb-5 text-2xl font-bold text-white sm:text-3xl">
                            명예의 전당
                        </h2>
                        <div className="mt-6 border-l-2 border-white/30 pl-4 flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <p className="text-sm text-slate-400">
                                    8기 졸업자
                                </p>
                                <p className="mt-1 text-lg font-semibold text-white">
                                    김호준, 서영우
                                </p>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>

                <ScrollReveal>
                    <section
                        id="history-leader"
                        className="scroll-mt-24 border-t border-white/15 pt-8"
                    >
                        <h2 className="mb-5 text-2xl font-bold text-white sm:text-3xl">
                            부장
                        </h2>
                        <div className="mt-6 border-l-2 border-white/30 pl-4 flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <p className="text-sm text-slate-400">
                                    9기 부장
                                </p>
                                <p className="mt-1 text-lg font-semibold text-white">
                                    김성한
                                </p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm text-slate-400">
                                    10기 부장
                                </p>
                                <p className="mt-1 text-lg font-semibold text-white">
                                    장준혁
                                </p>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>

                <ScrollReveal>
                    <section
                        id="history-gallery"
                        className="scroll-mt-24 border-t border-white/15 pt-8"
                    >
                        <h2 className="mb-5 text-2xl font-bold text-white sm:text-3xl">
                            활동 사진
                        </h2>
                        <div className="flex w-full flex-col gap-8 sm:gap-10">
                            {historyItems.map((item, index) => (
                                <ScrollReveal
                                    key={item.title}
                                    delay={index * 120}
                                >
                                    <HistoryGalleryItem
                                        image={item.image}
                                        title={item.title}
                                        subtitle={item.subtitle}
                                    />
                                </ScrollReveal>
                            ))}
                        </div>
                    </section>
                </ScrollReveal>
            </div>
        </main>
    );
}
