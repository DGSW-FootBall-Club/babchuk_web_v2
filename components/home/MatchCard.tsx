import red_team from "@/public/redteam.svg";
import blue_team from "@/public/blueteam.svg";
import Image from "next/image";

type HoloCardProps = {
    redteam: number;
    blueteam: number;
    status: "full" | "pending";
};

export default function MatchCard({
    redteam,
    blueteam,
    status,
}: HoloCardProps) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-lg bg-white p-10 shadow-md relative cursor-pointer">
            {status === "full" && (
                <p className="absolute top-0 left-0 flex h-6 w-16 items-center justify-center rounded-lg bg-[#C33431] text-sm font-bold text-white">
                    가득참
                </p>
            )}
            {status === "pending" && (
                <p className="absolute top-0 left-0 flex h-6 w-16 items-center justify-center rounded-lg bg-[#009655] text-sm font-bold text-white">
                    모집중
                </p>
            )}
            <div className="flex flex-col items-center justify-center gap-2 ">
                <Image src={red_team} alt="redteam" width={50} height={50} />
                <div className="flex flex-col items-center justify-center gap-2">
                    <p>레드팀</p>
                    <span>{redteam}명</span>
                </div>
            </div>
            {/**날짜  */}
            <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-lg font-bold">2023.06.30</p>
                <p className="text-sm bg-gray-500 p-2 rounded-xl text-white">
                    오후 3:00
                </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
                <Image src={blue_team} alt="blueteam" width={50} height={50} />
                <div className="flex flex-col items-center justify-center gap-2">
                    <p>블루팀</p>
                    <span>{blueteam}명</span>
                </div>
            </div>
        </div>
    );
}
