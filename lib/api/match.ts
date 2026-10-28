import { ApiError, api } from "@/lib/api";
import type { CreateMatchPayload, Match } from "@/types/match.type";
import type { UserRequest } from "@/types/user.type";

export function createMatch(payload: CreateMatchPayload) {
    return api<Match>("/matches", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export async function getMatchById(id: string): Promise<Match | null> {
    try {
        return await api<Match>(`/matches/${encodeURIComponent(id)}`);
    } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
            return null;
        }
        throw error;
    }
}

export function getMatchList() {
    return api<Match[]>("/matches");
}

export function joinMatch(id: string, user: UserRequest) {
    return api<Pick<Match, "id" | "currentPlayers" | "status">>(
        `/matches/${encodeURIComponent(id)}/join`,
        {
            method: "POST",
            body: JSON.stringify({ user }),
        },
    );
}
