"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import useMatchForm from "@/hooks/useMatchForm";

export default function MatchForm() {
    const {
        matchName,
        setMatchName,
        maxPlayers,
        setMaxPlayers,
        date,
        setDate,
        time,
        setTime,
        authorName,
        setAuthorName,
        authorEmail,
        setAuthorEmail,
        isSubmitting,
        handleSubmit,
    } = useMatchForm();

    return (
        <form
            className="w-full flex min-h-full flex-col gap-4"
            onSubmit={handleSubmit}
        >
            <div className="w-full flex items-center gap-2">
                <Link href="/" aria-label="매치 목록으로 돌아가기">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-semibold text-black">
                    매치 만들기
                </h1>
            </div>
            <div className="flex flex-col gap-4 rounded-lg bg-gray-100">
                <label className="flex flex-col gap-2">
                    매치 이름
                    <input
                        type="text"
                        name="matchName"
                        value={matchName}
                        onChange={(event) => setMatchName(event.target.value)}
                        placeholder="매치 이름을 입력해 주세요."
                        required
                        className="w-full rounded-lg bg-white p-4 text-black"
                    />
                </label>
                <label className="flex flex-col gap-2">
                    최대 인원
                    <input
                        type="number"
                        name="maxPlayers"
                        value={maxPlayers || ""}
                        onChange={(event) =>
                            setMaxPlayers(Number(event.target.value))
                        }
                        placeholder="최대 인원을 입력해 주세요."
                        className="w-full rounded-lg bg-white p-4 text-black"
                        min={2}
                        required
                    />
                </label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-2">
                        날짜
                        <input
                            type="date"
                            name="date"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                            required
                            className="w-full rounded-lg bg-white p-4 text-black"
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        시간
                        <input
                            type="time"
                            name="time"
                            value={time}
                            onChange={(event) => setTime(event.target.value)}
                            required
                            className="w-full rounded-lg bg-white p-4 text-black"
                        />
                    </label>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-2">
                        작성자 이름
                        <input
                            type="text"
                            name="authorName"
                            value={authorName}
                            onChange={(event) =>
                                setAuthorName(event.target.value)
                            }
                            placeholder="작성자 이름을 입력해 주세요."
                            required
                            className="w-full rounded-lg bg-white p-4 text-black"
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        작성자 이메일
                        <input
                            type="email"
                            name="authorEmail"
                            value={authorEmail}
                            onChange={(event) =>
                                setAuthorEmail(event.target.value)
                            }
                            placeholder="작성자 이메일을 입력해 주세요."
                            required
                            className="w-full rounded-lg bg-white p-4 text-black"
                        />
                    </label>
                </div>
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer mt-20  w-full rounded-lg bg-black px-4 py-3 font-semibold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isSubmitting ? "생성 중..." : "매치 만들기"}
            </button>
        </form>
    );
}
