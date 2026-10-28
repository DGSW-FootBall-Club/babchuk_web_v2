"use client";

import { useState, type FormEvent } from "react";
import useLogin from "@/hooks/useLogin";

export default function LoginForm() {
    const { login, isSubmitting } = useLogin();
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        void login(username, name);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-sm flex-col gap-4"
        >
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                이름
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    required
                    className="w-full rounded-lg border border-slate-200 bg-white p-3 text-black outline-none transition focus:border-slate-400"
                />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                사용자 이름
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    autoComplete="username"
                    required
                    className="w-full rounded-lg border border-slate-200 bg-white p-3 text-black outline-none transition focus:border-slate-400"
                />
            </label>
            <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-[#0083f0] p-4 text-xl font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSubmitting ? "로그인 중..." : "로그인"}
            </button>
        </form>
    );
}
