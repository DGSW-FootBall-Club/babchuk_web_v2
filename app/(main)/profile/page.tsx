"use client";

import Image from "next/image";
import { useProfileStore } from "@/stores/profileStore";

export default function ProfilePage() {
    const profile = useProfileStore((state) => state.profile);
    const isLoading = useProfileStore((state) => state.isLoading);
    const error = useProfileStore((state) => state.error);

    if (!profile) {
        return (
            <main className="mx-auto w-full max-w-3xl">
                <h1 className="text-2xl font-bold">프로필</h1>
                <p className="mt-4 text-slate-600">
                    {isLoading
                        ? "프로필을 불러오는 중입니다..."
                        : error
                          ? "프로필을 불러오지 못했어요."
                          : "프로필 정보가 없습니다."}
                </p>
            </main>
        );
    }

    return (
        <main className="mx-auto w-full max-w-3xl">
            <h1 className="text-2xl font-bold">프로필</h1>
            <section className="mt-6 flex items-center gap-4 rounded-xl bg-white p-6 shadow-sm">
                {profile.profileImage && (
                    <Image
                        src={profile.profileImage}
                        alt="프로필 이미지"
                        width={100}
                        height={100}
                        unoptimized
                        className="h-20 w-20 rounded-full object-cover"
                    />
                )}
                <div>
                    <p className="text-lg font-semibold">{profile.name}</p>
                    <p className="text-slate-600">@{profile.username}</p>
                </div>
            </section>
        </main>
    );
}
