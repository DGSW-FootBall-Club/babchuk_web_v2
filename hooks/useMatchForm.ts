"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createMatch } from "@/lib/api/match";
import type { User } from "@/types/user.type";

export default function useMatchForm() {
    const router = useRouter();

    const [matchName, setMatchName] = useState("");
    const [maxPlayers, setMaxPlayers] = useState(0);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [authorUsername, setAuthorUsername] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (isSubmitting) return;

        const trimmedAuthorName = authorName.trim();
        const trimmedAuthorUsername = authorUsername.trim();

        if (
            !matchName.trim() ||
            !Number.isInteger(maxPlayers) ||
            maxPlayers < 2 ||
            !date ||
            !time ||
            !trimmedAuthorName ||
            !trimmedAuthorUsername
        ) {
            toast.error("매치 정보와 작성자 정보를 올바르게 입력해주세요.");
            return;
        }

        setIsSubmitting(true);

        try {
            const author: User = {
                username: trimmedAuthorUsername,
                name: trimmedAuthorName,
                currentMatchIds: [],
                participatedMatchIds: [],
                joinedMatchIds: [],
            };

            await createMatch({
                title: matchName.trim(),
                maxPlayers,
                startAt: `${date}T${time}`,
                author,
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
        authorName,
        setAuthorName,
        authorUsername,
        setAuthorUsername,
        isSubmitting,
        handleSubmit,
    };
}
