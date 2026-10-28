export type TeamType = "A" | "B";

export type Profile = {
    userId: string;
    username: string;
    name: string;
    participatedMatchIds?: string[];
    currentMatchIds?: string[];
    profileImage?: string | null;
};

export type UserRequest = {
    username: string;
    name: string;
};

export type MatchUser = UserRequest & {
    userId?: string;
    team?: TeamType;
    profileImage?: string | null;
};
