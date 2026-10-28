"use client";

import BackButton from "@/components/common/BackButton";
import MatchTimePicker from "@/components/match/MatchTimePicker";
import useMatchForm from "@/hooks/useMatchForm";

export default function MatchForm() {
    const {
        matchName,
        setMatchName,
        maxPlayers,
        setMaxPlayers,
        maxPlayersLimit,
        date,
        setDate,
        time,
        setTime,
        canSubmit,
        profileIsLoading,
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
                        max={maxPlayersLimit}
                        required
                    />
                    <span className="text-sm font-normal text-slate-500">
                        최대 {maxPlayersLimit}명까지 신청할 수 있습니다.
                    </span>
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
                    <div className="flex flex-col gap-2 text-sm font-medium text-slate-700 sm:text-base">
                        <span>시간</span>
                        <MatchTimePicker
                            value={time}
                            onChange={setTime}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting || profileIsLoading}
                    className="mt-4 w-full cursor-pointer rounded-lg bg-black px-4 py-3 font-semibold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-6"
                >
                    {profileIsLoading
                        ? "프로필 확인 중..."
                        : isSubmitting
                          ? "생성 중..."
                          : canSubmit
                            ? "매치 만들기"
                            : "로그인 후 이용 가능"}
                </button>
            </div>
        </form>
    );
}
