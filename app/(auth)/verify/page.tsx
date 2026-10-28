"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api";

function Verify() {
    const router = useRouter();
    const params = useSearchParams();

    useEffect(() => {
        const code = params.get("code");
        const state = params.get("state");
        const savedState = sessionStorage.getItem("oauth_state");

        if (!code || !state || state !== savedState) {
            router.replace("/login?error=invalid_state");
            return;
        }
        sessionStorage.removeItem("oauth_state");

        const codeVerifier = sessionStorage.getItem("code_verifier");
        sessionStorage.removeItem("code_verifier");

        if (!codeVerifier) {
            router.replace("/login?error=auth_failed");
            return;
        }

        void api("/auth/token", {
            method: "POST",
            body: JSON.stringify({ code, codeVerifier }),
        })
            .then(() => router.replace("/"))
            .catch(() => router.replace("/login?error=auth_failed"));
    }, [params, router]);

    return <p>인증 중...</p>;
}

export default function VerifyPage() {
    return (
        <Suspense>
            <Verify />
        </Suspense>
    );
}
