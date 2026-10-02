"use client";

import { useEffect, useState } from "react";
import { mockMatches } from "@/lib/mock/matchData";
import type { Match } from "@/types/match.type";

const mockMatchById: Record<string, Match> = Object.fromEntries(
    mockMatches.map((match) => [match.id, match]),
);

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
