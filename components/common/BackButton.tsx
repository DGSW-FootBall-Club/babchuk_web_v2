"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
    fallbackHref: string;
    label?: string;
};

export default function BackButton({
    fallbackHref,
    label = "이전 페이지로 이동",
}: BackButtonProps) {
    const router = useRouter();

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
            return;
        }

        router.push(fallbackHref);
    };

    return (
        <button
            type="button"
            onClick={handleBack}
            aria-label={label}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center"
        >
            <ArrowLeft className="h-6 w-6" />
        </button>
    );
}
