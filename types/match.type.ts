import type { User } from "./user.type";

export type MatchStatus = "pending" | "full";

export type Match = {
    id: string;
    title: string;
    maxPlayers: number;
    currentPlayers: number;
    status: MatchStatus;
    date: string;
    time: string;
    author: User;
    users: User[];
};

export type CreateMatchPayload = {
    title: string;
    maxPlayers: number;
    startAt: string;
    author: User;
};
