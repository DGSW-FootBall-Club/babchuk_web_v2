"use client";

import useLogin from "@/hooks/useLogin";

export default function LoginForm() {
    const { login } = useLogin();
    return (
        <button
            className="flex w-full max-w-sm cursor-pointer flex-col items-center justify-center rounded-lg bg-[#0083f0] p-4"
            onClick={login}
        >
            <div className="text-xl font-medium text-white flex gap-2   ">
                도담도담으로 로그인
            </div>
        </button>
    );
}
