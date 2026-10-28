"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useProfileStore } from "@/stores/profileStore";

export default function useLogin() {
    const router = useRouter();
    const signIn = useProfileStore((state) => state.login);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const login = async (username: string, name: string) => {
        const credentials = {
            username: username.trim(),
            name: name.trim(),
        };
        if (!credentials.username || !credentials.name) {
            toast.error("이름과 사용자 이름을 입력해주세요.");
            return;
        }

        setIsSubmitting(true);
        try {
            await signIn(credentials);
            toast.success("로그인되었습니다.");
            router.replace("/");
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "로그인에 실패했어요.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return { login, isSubmitting };
}
