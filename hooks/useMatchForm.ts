"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createMatch } from "@/lib/api/match";
import { useProfileStore } from "@/stores/profileStore";

export default function useMatchForm() {
    const router = useRouter();

    const [matchName, setMatchName] = useState("");
    const [maxPlayers, setMaxPlayers] = useState(0);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const profile = useProfileStore((state) => state.profile);
    const profileIsLoading = useProfileStore((state) => state.isLoading);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (isSubmitting) return;

        if (
            !matchName.trim() ||
            !Number.isInteger(maxPlayers) ||
            maxPlayers < 2 ||
            !date ||
            !time
        ) {
            toast.error("매치 정보를 올바르게 입력해주세요.");
            return;
        }

        if (!profile) {
            toast.error(
                profileIsLoading
                    ? "프로필을 불러오는 중입니다."
                    : "매치를 만들려면 먼저 로그인해주세요.",
            );
            return;
        }

        setIsSubmitting(true);

        try {
            await createMatch({
                title: matchName.trim(),
                maxPlayers,
                startAt: `${date}T${time}`,
                author: {
                    username: profile.username,
                    name: profile.name,
                },
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
        canSubmit: Boolean(profile) && !profileIsLoading,
        isSubmitting,
        handleSubmit,
    };
}
