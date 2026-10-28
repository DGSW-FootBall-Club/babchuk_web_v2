const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

const NO_REFRESH = ["/auth/token", "/auth/refresh"];

export class ApiError extends Error {
    constructor(
        public status: number,
        public body?: unknown,
    ) {
        const message =
            body &&
            typeof body === "object" &&
            "message" in body &&
            typeof body.message === "string"
                ? body.message
                : `요청에 실패했어요. (${status})`;
        super(message);
    }
}

let refreshing: Promise<boolean> | null = null;

function refreshToken(): Promise<boolean> {
    refreshing ??= fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
    })
        .then((res) => {
            if (!res.ok && res.status !== 401) {
                console.error(
                    "[API] POST /auth/refresh failed:",
                    `HTTP ${res.status}`,
                );
            }
            return res.ok;
        })
        .catch((error: unknown) => {
            console.error(
                "[API] POST /auth/refresh failed:",
                error instanceof Error ? error.message : "Unknown error",
            );
            return false;
        })
        .finally(() => {
            refreshing = null;
        });
    return refreshing;
}

export async function api<T = unknown>(
    path: string,
    init: RequestInit = {},
): Promise<T> {
    try {
        if (!BASE_URL) {
            throw new Error(
                "NEXT_PUBLIC_API_URL 환경 변수가 설정되지 않았습니다.",
            );
        }

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
                throw new ApiError(401);
            }
            res = await request();
        }

        if (!res.ok) {
            const body = await res.json().catch(() => undefined);
            throw new ApiError(res.status, body);
        }

        if (res.status === 204) return undefined as T;
        const text = await res.text();
        return (text ? JSON.parse(text) : undefined) as T;
    } catch (error) {
        const detail =
            error instanceof ApiError
                ? `HTTP ${error.status}: ${error.message}`
                : error instanceof Error
                  ? error.message
                  : "Unknown error";
        console.error(`[API] ${path} failed:`, detail);
        throw error;
    }
}
