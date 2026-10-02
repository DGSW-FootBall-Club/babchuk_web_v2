"use client";

import BackButton from "@/components/common/BackButton";
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
            className="flex w-full min-h-full flex-col gap-4"
            onSubmit={handleSubmit}
        >
            <div className="flex w-full items-center gap-2">
                <BackButton fallbackHref="/" label="이전 페이지로 이동" />
                <h1 className="text-xl font-semibold text-black sm:text-2xl">
                    매치 만들기
                </h1>
            </div>
            <div className="flex flex-col gap-4 rounded-2xl bg-gray-100 p-4 sm:p-6">
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 sm:text-base">
                    매치 이름
                    <input
                        type="text"
                        name="matchName"
                        value={matchName}
                        onChange={(event) => setMatchName(event.target.value)}
                        placeholder="매치 이름을 입력해 주세요."
                        required
                        className="w-full rounded-lg bg-white p-3 text-black outline-none ring-0 transition focus:border focus:border-slate-300 sm:p-4"
                    />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 sm:text-base">
                    최대 인원
                    <input
                        type="number"
                        name="maxPlayers"
                        value={maxPlayers || ""}
                        onChange={(event) =>
                            setMaxPlayers(Number(event.target.value))
                        }
                        placeholder="최대 인원을 입력해 주세요."
                        className="w-full rounded-lg bg-white p-3 text-black outline-none ring-0 transition focus:border focus:border-slate-300 sm:p-4"
                        min={2}
                        required
                    />
                </label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 sm:text-base">
                        날짜
                        <input
                            type="date"
                            name="date"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                            required
                            className="w-full rounded-lg bg-white p-3 text-black outline-none ring-0 transition focus:border focus:border-slate-300 sm:p-4"
                        />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 sm:text-base">
                        시간
                        <input
                            type="time"
                            name="time"
                            value={time}
                            onChange={(event) => setTime(event.target.value)}
                            required
                            className="w-full rounded-lg bg-white p-3 text-black outline-none ring-0 transition focus:border focus:border-slate-300 sm:p-4"
                        />
                    </label>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 sm:text-base">
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
                            className="w-full rounded-lg bg-white p-3 text-black outline-none ring-0 transition focus:border focus:border-slate-300 sm:p-4"
                        />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 sm:text-base">
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
                            className="w-full rounded-lg bg-white p-3 text-black outline-none ring-0 transition focus:border focus:border-slate-300 sm:p-4"
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 w-full cursor-pointer rounded-lg bg-black px-4 py-3 font-semibold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-6"
                >
                    {isSubmitting ? "생성 중..." : "매치 만들기"}
                </button>
            </div>
        </form>
    );
}
