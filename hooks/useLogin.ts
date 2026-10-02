"use client";

export default function useLogin() {
    const login = () => {
        const state = crypto.randomUUID();
        sessionStorage.setItem("oauth_state", state);

        const params = new URLSearchParams({
            response_type: "code",
            client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID!,
            redirect_uri: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI!,
            state,
        });

        window.location.href = `${process.env.NEXT_PUBLIC_OAUTH_AUTHORIZE_URL}?${params}`;
    };

    return { login };
}
