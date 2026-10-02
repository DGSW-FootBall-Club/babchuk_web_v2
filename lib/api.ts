const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

const NO_REFRESH = ["/auth/token", "/auth/refresh"];

export class ApiError extends Error {
    constructor(
        public status: number,
        public body?: unknown,
    ) {
        super(`API ${status}`);
    }
}

let refreshing: Promise<boolean> | null = null;

function refreshToken(): Promise<boolean> {
    refreshing ??= fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
    })
        .then((res) => res.ok)
        .catch(() => false)
        .finally(() => {
            refreshing = null;
        });
    return refreshing;
}

export async function api<T = unknown>(
    path: string,
    init: RequestInit = {},
): Promise<T> {
    const request = () => {
        const headers = new Headers(init.headers);
        if (
            init.body &&
            !(init.body instanceof FormData) &&
            !headers.has("Content-Type")
        ) {
            headers.set("Content-Type", "application/json");
        }
        return fetch(`${BASE_URL}${path}`, {
            ...init,
            headers,
            credentials: "include",
        });
    };

    let res = await request();

    if (res.status === 401 && !NO_REFRESH.includes(path)) {
        const ok = await refreshToken();
        if (!ok) {
            if (
                typeof window !== "undefined" &&
                window.location.pathname !== "/login"
            ) {
                window.location.href = "/login";
            }
            throw new ApiError(401);
        }
        res = await request(); // 원래 요청 재시도
    }

    if (!res.ok) {
        const body = await res.json().catch(() => undefined);
        throw new ApiError(res.status, body);
    }

    if (res.status === 204) return undefined as T;
    const text = await res.text();
    return (text ? JSON.parse(text) : undefined) as T;
}
