export type TeamType = "A" | "B";

export type User = {
    id?: string;
    email: string;
    name: string;
    team?: TeamType;
    profile?: string;
    currentMatchIds?: string[];
    participatedMatchIds?: string[];
    joinedMatchIds?: string[];
};
