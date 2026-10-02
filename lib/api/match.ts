import { api } from "@/lib/api";
import { mockMatches } from "@/lib/mock/matchData";
import type { CreateMatchPayload, Match } from "@/types/match.type";

const HAS_API = Boolean(process.env.NEXT_PUBLIC_API_URL);

export async function createMatch(payload: CreateMatchPayload) {
    if (!HAS_API) {
        return { ok: true, data: { ...payload, id: String(Date.now()) } };
    }

    return api<{ ok: true; data: Match }>("/matches", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export async function getMatchById(id: string) {
    if (!HAS_API) {
        return mockMatches.find((match) => match.id === id) ?? null;
    }

    return api<Match | null>(`/matches/${id}`);
}

export async function getMatchList() {
    if (!HAS_API) {
        return mockMatches;
    }

    return api<Match[]>("/matches");
}
