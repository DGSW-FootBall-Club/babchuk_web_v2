import type { CreateMatchPayload } from "@/types/match.type";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createMatch(_payload: CreateMatchPayload) {
    // const res = await fetch(`${API_URL}/matches`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     credentials: "include",
    //     body: JSON.stringify(payload),
    // });
    //
    // if (!res.ok) {
    //     const message = await res.text().catch(() => "");
    //     throw new Error(message || `요청 실패 (${res.status})`);
    // }
    //
    // return res.json();

    return Promise.resolve({ ok: true });
}

export async function getMatchById(_id: string) {
    // const res = await fetch(`${API_URL}/matches/${id}`, {
    //     method: "GET",
    //     headers: { "Content-Type": "application/json" },
    //     credentials: "include",
    // });
    //
    // if (!res.ok) {
    //     const message = await res.text().catch(() => "");
    //     throw new Error(message || `요청 실패 (${res.status})`);
    // }
    //
    // return res.json();

    return Promise.resolve({ ok: true });
}

export async function getMatchList() {
    // const res = await fetch(`${API_URL}/matches`, {
    //     method: "GET",
    //     headers: { "Content-Type": "application/json" },
    //     credentials: "include",
    // });
    //
    // if (!res.ok) {
    //     const message = await res.text().catch(() => "");
    //     throw new Error(message || `요청 실패 (${res.status})`);
    // }
    //
    // return res.json();

    return Promise.resolve([]);
}
