import type { MatchUser, UserRequest } from "./user.type";

export const MAX_MATCH_PLAYERS = 24;

export type MatchStatus = "pending" | "full";

export type Match = {
    id: string;
    title: string;
    maxPlayers: number;
    currentPlayers: number;
    status: MatchStatus;
    applicationLocked: boolean;
    date: string;
    time: string;
    author: MatchUser;
    users: MatchUser[];
};

export type CreateMatchPayload = {
    title: string;
    maxPlayers: number;
    startAt: string;
    author: UserRequest;
};

export type UpdateMatchPayload = Pick<
    CreateMatchPayload,
    "title" | "maxPlayers" | "startAt"
>;
