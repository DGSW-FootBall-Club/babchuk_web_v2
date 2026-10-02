import dgsw1 from "@/public/dgsw1.webp";
import dgsw2 from "@/public/dgsw2.webp";
import dgsw3 from "@/public/dgsw3.webp";
import dgsw4 from "@/public/dgsw4.webp";
import dgsw5 from "@/public/dgsw5.webp";
import Image from "next/image";
import Link from "next/link";

export default function HistoryCard() {
    return (
        <Link
            href="/history"
            className="history-card premium-card flex min-h-28 w-full flex-col items-center justify-center gap-2 rounded-lg px-5 py-8 text-center text-lg sm:min-h-32 sm:px-8 sm:text-2xl"
        >
            <span className="history-card-photo-window" aria-hidden="true">
                <span className="history-card-photo-track">
                    {[dgsw1, dgsw2, dgsw3, dgsw4, dgsw5].map((image, index) => (
                        <span className="history-card-photo-panel" key={index}>
                            <Image
                                src={image}
                                alt=""
                                fill
                                sizes="(max-width: 768px) 100vw, 768px"
                            />
                        </span>
                    ))}
                </span>
            </span>
            <span className="history-card-label premium-text relative z-10 font-bold">
                대소고 FC의 역사가 궁금하지 않으신가요?
            </span>
        </Link>
    );
}
