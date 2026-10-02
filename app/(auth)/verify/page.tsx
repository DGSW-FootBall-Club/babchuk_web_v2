"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code, codeVerifier }),
        }).then((res) => {
            router.replace(res.ok ? "/" : "/login?error=auth_failed");
        });
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
