"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getMatchById } from "@/lib/api/match";
import type { Match } from "@/types/match.type";

export default function useMatch(id: string) {
    const [result, setResult] = useState<{
        id: string;
        match: Match | null;
        error: string | null;
    } | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const requestId = useRef(0);

    useEffect(() => {
        let isActive = true;
        const currentRequestId = ++requestId.current;

        getMatchById(id)
            .then((match) => {
                if (isActive && requestId.current === currentRequestId) {
                    setResult({ id, match, error: null });
                }
            })
            .catch((error: unknown) => {
                if (isActive && requestId.current === currentRequestId) {
                    setResult({
                        id,
                        match: null,
                        error:
                            error instanceof Error
                                ? error.message
                                : "매치 정보를 불러오지 못했어요.",
                    });
                }
            });

        return () => {
            isActive = false;
            requestId.current += 1;
        };
    }, [id]);

    const refresh = useCallback(async () => {
        const currentRequestId = ++requestId.current;
        setIsRefreshing(true);
        try {
            const match = await getMatchById(id);
            if (requestId.current === currentRequestId) {
                setResult({ id, match, error: null });
            }
        } catch (error) {
            if (requestId.current === currentRequestId) {
                setResult({
                    id,
                    match: null,
                    error:
                        error instanceof Error
                            ? error.message
                            : "매치 정보를 불러오지 못했어요.",
                });
            }
        } finally {
            if (requestId.current === currentRequestId) {
                setIsRefreshing(false);
            }
        }
    }, [id]);

    return {
        match: result?.id === id ? result.match : null,
        isLoading: result?.id !== id || isRefreshing,
        error: result?.id === id ? result.error : null,
        refresh,
    };
}
