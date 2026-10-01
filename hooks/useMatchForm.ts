"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createMatch } from "@/lib/api/match";

export default function useMatchForm() {
    const router = useRouter();

    const [matchName, setMatchName] = useState("");
    const [maxPlayers, setMaxPlayers] = useState(0);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (isSubmitting) return;

        if (!matchName.trim() || maxPlayers < 2 || !date || !time) {
            toast.error("모든 항목을 올바르게 입력해주세요.");
            return;
        }

        setIsSubmitting(true);

        try {
            await createMatch({
                title: matchName.trim(),
                maxPlayers,
                startAt: `${date}T${time}`,
            });
            toast.success("매치가 생성되었어요.");
            router.push("/match");
        } catch (err) {
            toast.error(
                err instanceof Error ? err.message : "매치 생성에 실패했어요.",
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return {
        matchName,
        setMatchName,
        maxPlayers,
        setMaxPlayers,
        date,
        setDate,
        time,
        setTime,
        isSubmitting,
        handleSubmit,
    };
}
