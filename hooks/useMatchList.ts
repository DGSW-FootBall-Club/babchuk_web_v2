"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getMatchList } from "@/lib/api/match";
import type { Match } from "@/types/match.type";

export default function useMatchList() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const requestId = useRef(0);

    useEffect(() => {
        let isActive = true;
        const currentRequestId = ++requestId.current;

        getMatchList()
            .then((result) => {
                if (isActive && requestId.current === currentRequestId) {
                    setMatches(result);
                    setError(null);
                }
            })
            .catch((error: unknown) => {
                if (isActive && requestId.current === currentRequestId) {
                    setError(
                        error instanceof Error
                            ? error.message
                            : "매치 목록을 불러오지 못했어요.",
                    );
                }
            })
            .finally(() => {
                if (isActive && requestId.current === currentRequestId) {
                    setIsLoading(false);
                }
            });

        return () => {
            isActive = false;
        };
    }, []);

    const refresh = useCallback(() => {
        const currentRequestId = ++requestId.current;
        setIsLoading(true);
        setError(null);
        getMatchList()
            .then((result) => {
                if (requestId.current === currentRequestId) {
                    setMatches(result);
                }
            })
            .catch((error: unknown) => {
                if (requestId.current === currentRequestId) {
                    setError(
                        error instanceof Error
                            ? error.message
                            : "매치 목록을 불러오지 못했어요.",
                    );
                }
            })
            .finally(() => {
                if (requestId.current === currentRequestId) {
                    setIsLoading(false);
                }
            });
    }, []);

    return { matches, isLoading, error, refresh };
}
