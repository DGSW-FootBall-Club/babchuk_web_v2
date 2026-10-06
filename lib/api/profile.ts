import { api } from "@/lib/api";
import type { Profile } from "@/types/user.type";

export function getMe() {
    return api<Profile>("/auth/getme");
}
