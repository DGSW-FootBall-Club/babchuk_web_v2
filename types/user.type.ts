export type TeamType = "A" | "B";

export type Profile = {
    userId: string;
    username: string;
    name: string;
    participatedMatchIds: string[];
    currentMatchIds: string[];
    profileImage: string | null;
};

export type User = {
    id?: string;
    userId?: string;
    username: string;
    name: string;
    team?: TeamType;
    profileImage?: string | null;
    currentMatchIds?: string[];
    participatedMatchIds?: string[];
    joinedMatchIds?: string[];
};
