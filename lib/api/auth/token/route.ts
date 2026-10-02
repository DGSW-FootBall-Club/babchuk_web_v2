import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const { code, codeVerifier } = await req.json();
    if (!code || !codeVerifier) {
        return NextResponse.json({ error: "invalid request" }, { status: 400 });
    }

    const tokenRes = await fetch(process.env.OAUTH_TOKEN_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            grant_type: "authorization_code",
            code,
            redirect_uri: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI,
            client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
            client_secret: process.env.OAUTH_CLIENT_SECRET,
            code_verifier: codeVerifier,
        }),
    });
    if (!tokenRes.ok) {
        return NextResponse.json(
            { error: "token exchange failed" },
            { status: 401 },
        );
    }
    const { access_token, refresh_token, expires_in } = await tokenRes.json();

    const userRes = await fetch(process.env.OAUTH_USERINFO_URL!, {
        headers: { Authorization: `Bearer ${access_token}` },
    });
    if (!userRes.ok) {
        return NextResponse.json({ error: "userinfo failed" }, { status: 401 });
    }
    const user = await userRes.json();

    const cookieStore = await cookies();
    const base = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
    };
    cookieStore.set("access_token", access_token, {
        ...base,
        maxAge: expires_in ?? 3600,
    });
    if (refresh_token) {
        cookieStore.set("refresh_token", refresh_token, {
            ...base,
            maxAge: 60 * 60 * 24 * 30,
        });
    }

    return NextResponse.json({ user });
}
