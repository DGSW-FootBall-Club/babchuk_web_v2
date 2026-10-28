"use client";

import { ApiError } from "@/lib/api";
import { useProfileStore } from "@/stores/profileStore";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

type MatchCreateAuthGuardProps = {
    children: ReactNode;
};

export default function MatchCreateAuthGuard({
    children,
}: MatchCreateAuthGuardProps) {
    const router = useRouter();
    const loadProfile = useProfileStore((state) => state.loadProfile);
    const [status, setStatus] = useState<
        "checking" | "authorized" | "error"
    >("checking");
    const [attempt, setAttempt] = useState(0);
    const profileRequest = useRef<Promise<void> | null>(null);

    useEffect(() => {
        let isActive = true;
        const request = profileRequest.current ?? loadProfile();
        profileRequest.current = request;

        request
            .then(() => {
                if (!isActive) return;
                if (useProfileStore.getState().profile) {
                    setStatus("authorized");
                    return;
                }
                router.replace("/login");
            })
            .catch((error: unknown) => {
                if (!isActive) return;
                if (error instanceof ApiError && error.status === 401) {
                    router.replace("/login");
                    return;
                }

                console.error(
                    "[Auth] Failed to verify match creation access:",
                    error,
                );
                setStatus("error");
            })
            .finally(() => {
                if (profileRequest.current === request) {
                    profileRequest.current = null;
                }
            });

        return () => {
            isActive = false;
        };
    }, [attempt, loadProfile, router]);

    if (status === "authorized") return children;

    if (status === "error") {
        return (
            <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
                <p className="text-slate-700">
                    로그인 상태를 확인할 수 없습니다. 다시 시도해주세요.
                </p>
                <button
                    type="button"
                    onClick={() => {
                        setStatus("checking");
                        setAttempt((current) => current + 1);
                    }}
                    className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white"
                >
                    다시 시도
                </button>
            </main>
        );
    }

    return (
        <main className="mx-auto flex w-full max-w-md flex-1 items-center justify-center px-4">
            <p className="text-slate-600">로그인 상태를 확인하는 중...</p>
        </main>
    );
}
