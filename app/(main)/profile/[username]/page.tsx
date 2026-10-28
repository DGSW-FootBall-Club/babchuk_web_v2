"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProfileContent from "@/components/profile/ProfileContent";
import { getUserMatchHistory } from "@/lib/api/match";
import type { PublicMatchHistory } from "@/types/match.type";

type ProfileRequestResult = {
    username: string;
    retry: number;
    history: PublicMatchHistory | null;
    error: string | null;
};

export default function PublicProfilePage() {
    const { username } = useParams<{ username: string }>();
    const [retry, setRetry] = useState(0);
    const [requestResult, setRequestResult] =
        useState<ProfileRequestResult | null>(null);

    useEffect(() => {
        let isActive = true;

        getUserMatchHistory(username)
            .then((history) => {
                if (isActive) {
                    setRequestResult({
                        username,
                        retry,
                        history,
                        error: null,
                    });
                }
            })
            .catch((error: unknown) => {
                console.error("[PublicProfile] Failed to load profile:", error);
                if (isActive) {
                    setRequestResult({
                        username,
                        retry,
                        history: null,
                        error:
                            error instanceof Error
                                ? error.message
                                : "프로필을 불러오지 못했어요.",
                    });
                }
            });

        return () => {
            isActive = false;
        };
    }, [username, retry]);

    const result =
        requestResult?.username === username &&
        requestResult.retry === retry
            ? requestResult
            : null;

    if (!result?.history) {
        return (
            <main className="mx-auto w-full max-w-3xl">
                <h1 className="text-2xl font-bold">프로필</h1>
                {result?.error ? (
                    <div className="mt-4 flex flex-col items-start gap-3">
                        <p className="text-sm text-red-600">{result.error}</p>
                        <button
                            type="button"
                            onClick={() => setRetry((value) => value + 1)}
                            className="text-sm font-semibold underline"
                        >
                            다시 시도
                        </button>
                    </div>
                ) : (
                    <p className="mt-4 text-slate-600">
                        프로필을 불러오는 중입니다...
                    </p>
                )}
            </main>
        );
    }

    return (
        <ProfileContent
            profile={result.history.profile}
            history={result.history}
            isLoading={false}
            error={result.error}
            onRetry={() => setRetry((value) => value + 1)}
        />
    );
}
