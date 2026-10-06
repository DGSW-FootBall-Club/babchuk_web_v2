"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { ApiError } from "@/lib/api";
import { useProfileStore } from "@/stores/profileStore";

export default function ProfileLoader() {
    const loadProfile = useProfileStore((state) => state.loadProfile);

    useEffect(() => {
        void loadProfile().catch((error: unknown) => {
            if (!(error instanceof ApiError && error.status === 401)) {
                toast.error("프로필을 불러오지 못했어요.");
            }
        });
    }, [loadProfile]);

    return null;
}
