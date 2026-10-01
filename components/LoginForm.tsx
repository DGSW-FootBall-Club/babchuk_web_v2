"use client";

import useLogin from "@/hooks/useLogin";

export default function LoginForm() {
    const { login } = useLogin();
    return (
        <button
            className="bg-[#0083f0] flex flex-col items-center justify-center w-80 p-4 cursor-pointer rounded-lg"
            onClick={login}
        >
            <div className="text-xl font-medium text-white flex gap-2   ">
                도담도담으로 로그인
            </div>
        </button>
    );
}
