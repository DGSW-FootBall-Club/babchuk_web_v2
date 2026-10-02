"use client";

function base64Url(bytes: Uint8Array) {
    return btoa(String.fromCharCode(...bytes))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

export default function useLogin() {
    const login = async () => {
        const verifier = base64Url(crypto.getRandomValues(new Uint8Array(32)));
        const digest = await crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(verifier),
        );
        const challenge = base64Url(new Uint8Array(digest));
        const state = crypto.randomUUID();

        sessionStorage.setItem("code_verifier", verifier);
        sessionStorage.setItem("oauth_state", state);

        const params = new URLSearchParams({
            response_type: "code",
            client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID!,
            redirect_uri: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI!,
            scope: process.env.NEXT_PUBLIC_OAUTH_SCOPE!,
            state,
            code_challenge: challenge,
            code_challenge_method: "S256",
        });

        window.location.href = `${process.env.NEXT_PUBLIC_OAUTH_AUTHORIZE_URL}?${params}`;
    };

    return { login };
}
