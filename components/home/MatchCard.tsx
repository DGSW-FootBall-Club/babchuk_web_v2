import red_team from "@/public/redteam.svg";
import blue_team from "@/public/blueteam.svg";
import Image from "next/image";
import Link from "next/link";

type HoloCardProps = {
    id?: string;
    redteam: number;
    blueteam: number;
    status: "full" | "pending";
    date?: string;
    time?: string;
};

export default function MatchCard({
    id,
    redteam,
    blueteam,
    status,
    date = "2023.06.30",
    time = "오후 3:00",
}: HoloCardProps) {
    const cardContent = (
        <div className="relative flex min-h-32 items-center justify-between gap-2 rounded-lg bg-white p-4 pt-8 shadow-md sm:gap-4 sm:p-5 sm:pt-8">
            {status === "full" && (
                <p className="absolute left-0 top-0 flex h-6 w-16 items-center justify-center rounded-tl-lg rounded-br-lg bg-[#C33431] text-xs font-bold text-white">
                    가득참
                </p>
            )}
            {status === "pending" && (
                <p className="absolute left-0 top-0 flex h-6 w-16 items-center justify-center rounded-tl-lg rounded-br-lg bg-[#009655] text-xs font-bold text-white">
                    모집중
                </p>
            )}
            <div className="flex flex-col items-center justify-center gap-2 ">
                <Image
                    src={red_team}
                    alt="redteam"
                    width={50}
                    height={50}
                    className="h-10 w-10 sm:h-12 sm:w-12"
                />
                <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-sm font-medium sm:text-base">레드팀</p>
                    <span className="text-sm text-gray-600">{redteam}명</span>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-center text-sm font-bold sm:text-base">
                    {date}
                </p>
                <p className="rounded-md bg-gray-600 px-2 py-1 text-xs text-white sm:text-sm">
                    {time}
                </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
                <Image
                    src={blue_team}
                    alt="blueteam"
                    width={50}
                    height={50}
                    className="h-10 w-10 sm:h-12 sm:w-12"
                />
                <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-sm font-medium sm:text-base">블루팀</p>
                    <span className="text-sm text-gray-600">{blueteam}명</span>
                </div>
            </div>
        </div>
    );

    if (!id) {
        return cardContent;
    }

    return (
        <Link href={`/match/${id}`} className="block">
            {cardContent}
        </Link>
    );
}
