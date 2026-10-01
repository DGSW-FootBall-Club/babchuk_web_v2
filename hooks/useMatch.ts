"use client";

import { useEffect, useState } from "react";
import type { Match } from "@/types/match.type";

const mockMatchById: Record<string, Match> = {
    "1": {
        id: "1",
        title: "주말 축구 매치",
        maxPlayers: 10,
        currentPlayers: 7,
        status: "pending",
        date: "2026-10-03",
        time: "18:00",
        author: {
            name: "민수",
            email: "minsu@example.com",
        },
        users: [
            { name: "민수", email: "minsu@example.com" },
            { name: "지우", email: "jiwoo@example.com" },
            { name: "현우", email: "hyunwoo@example.com" },
            { name: "서윤", email: "seoyun@example.com" },
            { name: "태준", email: "taejun@example.com" },
            { name: "예린", email: "yerin@example.com" },
            { name: "동현", email: "donghyun@example.com" },
        ],
    },
    "2": {
        id: "2",
        title: "친구끼리 풋살",
        maxPlayers: 8,
        currentPlayers: 8,
        status: "full",
        date: "2026-10-05",
        time: "20:30",
        author: {
            name: "준호",
            email: "junho@example.com",
        },
        users: [
            { name: "준호", email: "junho@example.com" },
            { name: "하린", email: "harin@example.com" },
            { name: "시온", email: "sion@example.com" },
            { name: "도윤", email: "doyun@example.com" },
            { name: "유진", email: "yujin@example.com" },
            { name: "재민", email: "jaemin@example.com" },
            { name: "강우", email: "kangwoo@example.com" },
            { name: "나경", email: "nakyung@example.com" },
        ],
    },
};

export default function useMatch(id: string) {
    const [match, setMatch] = useState<Match | null>(null);

    useEffect(() => {
        if (!id) {
            setMatch(null);
            return;
        }

        const selectedMatch = mockMatchById[id] ?? null;
        setMatch(selectedMatch);
    }, [id]);

    return { match };
}
