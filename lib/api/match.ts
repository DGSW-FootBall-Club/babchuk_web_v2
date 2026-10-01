const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type CreateMatchPayload = {
    title: string;
    maxPlayers: number;
    startAt: string;
};

export async function createMatch(payload: CreateMatchPayload) {
    const res = await fetch(`${API_URL}/matches`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const message = await res.text().catch(() => "");
        throw new Error(message || `요청 실패 (${res.status})`);
    }

    return res.json();
}
