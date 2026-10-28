"use client";

import MatchTimePicker from "@/components/match/MatchTimePicker";
import {
    MAX_MATCH_PLAYERS,
    type Match,
    type UpdateMatchPayload,
} from "@/types/match.type";
import { useState, type FormEvent } from "react";

type MatchEditFormProps = {
    match: Match;
    isSaving: boolean;
    onCancel: () => void;
    onSave: (payload: UpdateMatchPayload) => void;
};

export default function MatchEditForm({
    match,
    isSaving,
    onCancel,
    onSave,
}: MatchEditFormProps) {
    const [title, setTitle] = useState(match.title);
    const [maxPlayers, setMaxPlayers] = useState(match.maxPlayers);
    const [date, setDate] = useState(match.date);
    const [time, setTime] = useState(match.time);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (
            !title.trim() ||
            !Number.isInteger(maxPlayers) ||
            maxPlayers < 2 ||
            maxPlayers > MAX_MATCH_PLAYERS ||
            maxPlayers < match.currentPlayers ||
            !date ||
            !time
        ) {
            return;
        }

        onSave({
            title: title.trim(),
            maxPlayers,
            startAt: `${date}T${time}`,
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-5"
        >
            <h3 className="font-semibold text-slate-900">매치 정보 수정</h3>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                매치 이름
                <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-200 bg-white p-3 text-black outline-none focus:border-slate-400"
                />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                최대 인원
                <input
                    type="number"
                    value={maxPlayers}
                    onChange={(event) =>
                        setMaxPlayers(Number(event.target.value))
                    }
                    min={Math.max(2, match.currentPlayers)}
                    max={MAX_MATCH_PLAYERS}
                    step={1}
                    required
                    className="w-full rounded-lg border border-slate-200 bg-white p-3 text-black outline-none focus:border-slate-400"
                />
                <span className="font-normal text-slate-500">
                    2명 이상 {MAX_MATCH_PLAYERS}명 이하로 설정해야 하며, 현재
                    참가 인원({match.currentPlayers}명)보다 적게 설정할 수
                    없습니다.
                </span>
            </label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                    날짜
                    <input
                        type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        required
                        className="w-full rounded-lg border border-slate-200 bg-white p-3 text-black outline-none focus:border-slate-400"
                    />
                </label>
                <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                    <span className="text-sm font-medium text-slate-700">
                        시간
                    </span>
                    <MatchTimePicker value={time} onChange={setTime} />
                </div>
            </div>
            <div className="flex flex-col-reverse justify-end gap-2 sm:flex-row">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSaving}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50"
                >
                    취소
                </button>
                <button
                    type="submit"
                    disabled={
                        isSaving ||
                        !title.trim() ||
                        !Number.isInteger(maxPlayers) ||
                        maxPlayers < 2 ||
                        maxPlayers > MAX_MATCH_PLAYERS ||
                        maxPlayers < Math.max(2, match.currentPlayers)
                    }
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isSaving ? "저장 중..." : "변경 저장"}
                </button>
            </div>
        </form>
    );
}
