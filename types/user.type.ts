export type TeamType = "A" | "B";

export type User = {
    id?: string;
    email: string;
    name: string;
    team?: TeamType;
};
