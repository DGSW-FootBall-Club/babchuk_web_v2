import { ApiError, api } from "@/lib/api";
import type {
    CreateMatchPayload,
    Match,
    MyMatchHistory,
    UpdateMatchPayload,
    UpdateMatchResultPayload,
} from "@/types/match.type";
import type { UserRequest } from "@/types/user.type";

export function createMatch(payload: CreateMatchPayload) {
    return api<Match>("/matches", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function updateMatch(id: string, payload: UpdateMatchPayload) {
    return api<Match>(`/matches/${encodeURIComponent(id)}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}

export function deleteMatch(id: string) {
    return api<void>(`/matches/${encodeURIComponent(id)}`, {
        method: "DELETE",
    });
}

export function updateMatchResult(
    id: string,
    payload: UpdateMatchResultPayload,
) {
    return api<Match>(`/matches/${encodeURIComponent(id)}/result`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}

export function getMyMatchHistory() {
    return api<MyMatchHistory>("/matches/my");
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

export function setMatchApplicationLock(id: string, locked: boolean) {
    return api<Match>(`/matches/${encodeURIComponent(id)}/applications`, {
        method: "PATCH",
        body: JSON.stringify({ locked }),
    });
}

export function shuffleMatchTeams(id: string) {
    return api<Match>(`/matches/${encodeURIComponent(id)}/shuffle`, {
        method: "POST",
    });
}
