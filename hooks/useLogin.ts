"use client";

import { useRouter } from "next/navigation";

export default function useLogin() {
    const router = useRouter();
    return {
        login: () => {
            console.log("login");
            router.push("/");
        },
    };
}
