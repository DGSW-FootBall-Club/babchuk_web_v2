"use client";

import { create } from "zustand";
import { getMe, login, logout } from "@/lib/api/profile";
import type { Profile } from "@/types/user.type";

type ProfileState = {
    profile: Profile | null;
    isLoading: boolean;
    error: string | null;
    loadProfile: () => Promise<void>;
    login: (credentials: Pick<Profile, "name" | "username">) => Promise<void>;
    logout: () => Promise<void>;
    clearProfile: () => void;
};

export const useProfileStore = create<ProfileState>((set, get) => ({
    profile: null,
    isLoading: false,
    error: null,
    loadProfile: async () => {
        if (get().isLoading) return;

        set({ isLoading: true, error: null });

        try {
            const profile = await getMe();
            set({ profile });
        } catch (error) {
            set({
                profile: null,
                error:
                    error instanceof Error
                        ? error.message
                        : "프로필을 불러오지 못했어요.",
            });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
    login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
            const profile = await login(credentials);
            set({ profile });
        } catch (error) {
            set({
                profile: null,
                error:
                    error instanceof Error
                        ? error.message
                        : "로그인에 실패했어요.",
            });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            await logout();
            set({ profile: null });
        } catch (error) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : "로그아웃에 실패했어요.",
            });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
    clearProfile: () => set({ profile: null, error: null }),
}));
