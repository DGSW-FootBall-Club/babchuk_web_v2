"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getMe } from "@/lib/api/profile";

function Verify() {
    const router = useRouter();
    const params = useSearchParams();
    const hasStarted = useRef(false);

    useEffect(() => {
        if (hasStarted.current) return;

        const code = params.get("code");
        const state = params.get("state");
        const savedState = sessionStorage.getItem("oauth_state");

        if (!code || !state || state !== savedState) {
            router.replace("/login?error=invalid_state");
            return;
        }
        hasStarted.current = true;
        sessionStorage.removeItem("oauth_state");

        const codeVerifier = sessionStorage.getItem("code_verifier");
        sessionStorage.removeItem("code_verifier");

        if (!codeVerifier) {
            router.replace("/login?error=auth_failed");
            return;
        }

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code, codeVerifier }),
        })
            .then(async (res) => {
                if (!res.ok) {
                    const body = await res.json().catch(() => undefined);
                    const message =
                        body &&
                        typeof body === "object" &&
                        "message" in body &&
                        typeof body.message === "string"
                            ? body.message
                            : `인증 코드 교환 실패 (HTTP ${res.status})`;
                    throw new Error(message);
                }
                return getMe();
            })
            .then(() => router.replace("/"))
            .catch((error: unknown) => {
                console.error(
                    "[Auth] OAuth callback or session check failed:",
                    error instanceof Error ? error.message : "Unknown error",
                );
                router.replace("/login?error=auth_failed");
            });
    }, [params, router]);

    return <p>인증 중...</p>;
}

export default function VerifyPage() {
    return (
        <Suspense fallback={<p>인증 중...</p>}>
            <Verify />
        </Suspense>
    );
}
