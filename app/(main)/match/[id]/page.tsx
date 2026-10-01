"use client";

import Stadium from "@/public/stadium.svg";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useMatch from "@/hooks/useMatch";
import { usePathname } from "next/navigation";

export default function Match() {
    const pathname = usePathname();
    const id = pathname.split("/").filter(Boolean).at(-1) ?? "";
    const { match } = useMatch(id);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full flex items-center gap-2">
                <Link href="/match" aria-label="매치 목록으로 돌아가기">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-semibold text-black">매치 정보</h1>
            </div>
            <section className="flex flex-col w-full mt-4">
                <div className="w-full h-70">
                    <Image
                        src={Stadium}
                        alt="stadium image"
                        className="inset-0 w-full h-full object-cover"
                    />
                </div>
                <div className="w-full flex flex-col gap-4 rounded-xl p-4 text-white">
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="text-2xl font-bold text-black">
                            {match?.title ?? "매치 정보 불러오는 중..."}
                        </h2>
                        <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                match?.status === "full"
                                    ? "bg-red-500 text-white"
                                    : "bg-emerald-500 text-white"
                            }`}
                        >
                            {match?.status === "full"
                                ? "신청 마감"
                                : "신청 가능"}
                        </span>
                    </div>

                    {!match ? (
                        <p className="text-sm text-slate-300">
                            매치 정보를 불러오고 있습니다.
                        </p>
                    ) : (
                        <>
                            <p className="text-base text-black">
                                {match.date}일 {match.time}
                            </p>
                            <p className="text-base text-black">
                                현재 인원: {match.currentPlayers}/
                                {match.maxPlayers}
                            </p>

                            <div className="mt-2 rounded-lg bg-slate-800 p-3">
                                <p className="mb-2 text-sm font-semibold text-slate-100">
                                    참여 인원
                                </p>
                                <ul className="space-y-2">
                                    {match.users.length > 0 ? (
                                        match.users.map((user) => (
                                            <li
                                                key={user.email}
                                                className="flex items-center justify-between gap-3 rounded-md bg-slate-700 px-3 py-2 text-sm"
                                            >
                                                <span>{user.name}</span>
                                                <span className="text-slate-300">
                                                    {user.email}
                                                </span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-sm text-slate-300">
                                            현재 참여자가 없습니다.
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}
