import type { MatchUser, UserRequest } from "./user.type";

export const MAX_MATCH_PLAYERS = 24;

export type MatchStatus = "pending" | "full";
export type MatchResult = "A_WIN" | "B_WIN" | "DRAW";

export type MatchRecordStats = {
    wins: number;
    losses: number;
    draws: number;
};

export type MyMatchHistory = {
    currentMatches: Match[];
    participatedMatches: Match[];
    stats: MatchRecordStats;
};

export type Match = {
    id: string;
    title: string;
    maxPlayers: number;
    currentPlayers: number;
    status: MatchStatus;
    applicationLocked: boolean;
    result?: MatchResult | null;
    date: string;
    time: string;
    author: MatchUser;
    users: MatchUser[];
};

export type UpdateMatchResultPayload = {
    result: MatchResult | null;
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
