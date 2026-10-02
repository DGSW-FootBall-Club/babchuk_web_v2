import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const { code } = await req.json();
    if (!code) {
        return NextResponse.json({ error: "code required" }, { status: 400 });
    }

    const tokenRes = await fetch(process.env.OAUTH_TOKEN_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID!,
            client_secret: process.env.OAUTH_CLIENT_SECRET!,
            redirect_uri: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI!,
        }),
    });

    if (!tokenRes.ok) {
        return NextResponse.json(
            { error: "token exchange failed" },
            { status: 401 },
        );
    }
    const { access_token } = await tokenRes.json();

    const userRes = await fetch(process.env.OAUTH_USERINFO_URL!, {
        headers: { Authorization: `Bearer ${access_token}` },
    });
    if (!userRes.ok) {
        return NextResponse.json({ error: "userinfo failed" }, { status: 401 });
    }
    const user = await userRes.json();

    const cookieStore = await cookies();
    cookieStore.set("access_token", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
    });

    return NextResponse.json({ user });
}
