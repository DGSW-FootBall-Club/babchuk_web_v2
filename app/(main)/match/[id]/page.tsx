"use client";

import BackButton from "@/components/common/BackButton";
import MatchDetail from "@/components/match/MatchDetail";
import MatchEditForm from "@/components/match/MatchEditForm";
import useMatch from "@/hooks/useMatch";
import {
    deleteMatch,
    joinMatch,
    setMatchApplicationLock,
    shuffleMatchTeams,
    updateMatch,
} from "@/lib/api/match";
import Stadium from "@/public/stadium.svg";
import { useProfileStore } from "@/stores/profileStore";
import type { UpdateMatchPayload } from "@/types/match.type";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import toast from "react-hot-toast";

function MatchPageSkeleton() {
    return (
        <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center pb-20">
            <div className="w-full flex-1">
                <div className="flex w-full items-center gap-2">
                    <div className="h-6 w-6 animate-pulse rounded bg-slate-200" />
                    <div className="h-6 w-28 animate-pulse rounded bg-slate-200" />
                </div>
                <section className="mt-4 flex w-full flex-col gap-8">
                    <div className="h-56 w-full animate-pulse rounded-xl bg-slate-200 sm:h-64 lg:h-72" />
                    <div className="flex w-full flex-col gap-4 rounded-xl bg-white p-4 sm:p-5">
                        <div className="h-7 w-2/3 animate-pulse rounded bg-slate-200" />
                        <div className="h-16 w-full animate-pulse rounded-lg bg-slate-100" />
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <div className="h-24 animate-pulse rounded-lg bg-slate-100" />
                            <div className="h-24 animate-pulse rounded-lg bg-slate-100" />
                        </div>
                    </div>
                </section>
            </div>
            <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
                <div className="mx-auto w-full max-w-4xl">
                    <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200" />
                </div>
            </div>
        </div>
    );
}

function MatchPageContent() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { match, isLoading, error, refresh } = useMatch(id);
    const profile = useProfileStore((state) => state.profile);
    const [isJoining, setIsJoining] = useState(false);
    const [isUpdatingMatch, setIsUpdatingMatch] = useState(false);
    const [isEditingMatch, setIsEditingMatch] = useState(false);
    const [isDeletingMatch, setIsDeletingMatch] = useState(false);
    const [didJoin, setDidJoin] = useState(false);
    const isFull =
        match?.status === "full" ||
        (match !== null && match.currentPlayers >= match.maxPlayers);
    const alreadyJoined =
        didJoin || profile?.currentMatchIds?.includes(id) === true;
    const isMatchAuthor =
        Boolean(profile) &&
        (match?.author.userId
            ? match.author.userId === profile?.userId
            : match?.author.username === profile?.username);

    const handleJoinMatch = async () => {
        if (!match) return;
        if (!profile) {
            toast.error("참가 신청은 로그인 후 이용할 수 있습니다.");
            router.push("/login");
            return;
        }
        if (isJoining) return;
        if (isFull) {
            toast.error("마감된 매치는 신청할 수 없습니다.");
            return;
        }

        setIsJoining(true);
        try {
            await joinMatch(id, {
                name: profile.name,
                username: profile.username,
            });
            setDidJoin(true);
            await refresh();
            toast.success("참가 신청이 완료되었고 매치 정보를 갱신했어요.");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "참가 신청에 실패했습니다.",
            );
        } finally {
            setIsJoining(false);
        }
    };

    const handleToggleApplicationLock = async () => {
        if (!match || !isMatchAuthor || isUpdatingMatch) return;
        setIsUpdatingMatch(true);
        try {
            await setMatchApplicationLock(id, !match.applicationLocked);
            await refresh();
            toast.success(
                match.applicationLocked
                    ? "매치 신청을 다시 열었어요."
                    : "매치 신청을 잠갔어요.",
            );
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "신청 상태 변경에 실패했어요.",
            );
        } finally {
            setIsUpdatingMatch(false);
        }
    };

    const handleShuffleTeams = async () => {
        if (!match || !isMatchAuthor || isUpdatingMatch) return;
        setIsUpdatingMatch(true);
        try {
            await shuffleMatchTeams(id);
            await refresh();
            toast.success("참가자 팀을 섞었어요.");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "팀 셔플에 실패했어요.",
            );
        } finally {
            setIsUpdatingMatch(false);
        }
    };

    const handleUpdateMatch = async (payload: UpdateMatchPayload) => {
        if (!match || !isMatchAuthor || isUpdatingMatch) return;
        setIsUpdatingMatch(true);
        try {
            await updateMatch(id, payload);
            await refresh();
            setIsEditingMatch(false);
            toast.success("매치 정보를 수정했어요.");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "매치 정보 수정에 실패했어요.",
            );
        } finally {
            setIsUpdatingMatch(false);
        }
    };

    const handleDeleteMatch = async () => {
        if (!match || !isMatchAuthor || isDeletingMatch) return;
        if (!window.confirm("이 매치를 삭제할까요? 삭제 후에는 되돌릴 수 없습니다.")) {
            return;
        }

        setIsDeletingMatch(true);
        try {
            await deleteMatch(id);
            toast.success("매치를 삭제했어요.");
            router.push("/match");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "매치 삭제에 실패했어요.",
            );
            setIsDeletingMatch(false);
        }
    };

    if (isLoading) return <MatchPageSkeleton />;

    return (
        <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center pb-20">
            <div className="w-full flex-1">
                <div className="flex w-full items-center gap-2">
                    <BackButton
                        fallbackHref="/match"
                        label="매치 목록으로 돌아가기"
                    />
                    <h1 className="text-xl font-semibold text-black sm:text-2xl">
                        매치 정보
                    </h1>
                </div>

                {error ? (
                    <div className="mt-8 flex flex-col items-center gap-3 rounded-xl bg-white p-8 text-center">
                        <p className="text-slate-600">{error}</p>
                        <button
                            type="button"
                            onClick={() => void refresh()}
                            className="font-semibold underline"
                        >
                            다시 시도
                        </button>
                    </div>
                ) : !match ? (
                    <p className="mt-8 rounded-xl bg-white p-8 text-center text-slate-600">
                        매치를 찾을 수 없습니다.
                    </p>
                ) : (
                    <section className="mt-4 flex w-full flex-col gap-8">
                        <div className="h-56 w-full overflow-hidden rounded-xl sm:h-64 lg:h-72">
                            <Image
                                src={Stadium}
                                alt="축구 경기장"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <MatchDetail match={match} />
                        {isMatchAuthor && (
                            <section className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm sm:p-5">
                                <div>
                                    <h2 className="font-semibold text-slate-900">
                                        매치 관리
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-600">
                                        작성자만 매치 정보와 신청 상태, 팀 배정을
                                        관리할 수 있습니다.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsEditingMatch((editing) => !editing)
                                        }
                                        disabled={isUpdatingMatch || isDeletingMatch}
                                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {isEditingMatch ? "수정 취소" : "매치 수정"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => void handleDeleteMatch()}
                                        disabled={isDeletingMatch || isUpdatingMatch}
                                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {isDeletingMatch ? "삭제 중..." : "매치 삭제"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            void handleToggleApplicationLock()
                                        }
                                        disabled={isUpdatingMatch}
                                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {isUpdatingMatch
                                            ? "처리 중..."
                                            : match.applicationLocked
                                              ? "신청 잠금 해제"
                                              : "신청 잠그기"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            void handleShuffleTeams()
                                        }
                                        disabled={isUpdatingMatch}
                                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {isUpdatingMatch
                                            ? "처리 중..."
                                            : "팀 셔플"}
                                    </button>
                                </div>
                                {isEditingMatch && (
                                    <MatchEditForm
                                        key={match.id}
                                        match={match}
                                        isSaving={isUpdatingMatch}
                                        onCancel={() => setIsEditingMatch(false)}
                                        onSave={(payload) =>
                                            void handleUpdateMatch(payload)
                                        }
                                    />
                                )}
                            </section>
                        )}
                        {error && (
                            <p role="status" className="text-sm text-red-600">
                                매치 정보 갱신에 실패했습니다: {error}
                            </p>
                        )}
                    </section>
                )}
            </div>

            {match && !error && (
                <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
                    <div className="mx-auto w-full max-w-4xl">
                        <button
                            type="button"
                            className={`w-full rounded-xl px-4 py-3 text-base font-medium text-white ${
                                isJoining ||
                                isFull ||
                                match.applicationLocked ||
                                alreadyJoined
                                    ? "bg-gray-400"
                                    : "bg-black"
                            }`}
                            disabled={
                                isFull ||
                                match.applicationLocked ||
                                alreadyJoined ||
                                isJoining
                            }
                            onClick={handleJoinMatch}
                        >
                            {isJoining
                                ? "신청 중..."
                                : isFull
                                  ? "마감되었습니다"
                                  : match.applicationLocked
                                    ? "신청이 잠겼습니다"
                                  : alreadyJoined
                                    ? "이미 신청했습니다"
                                    : "참가 신청하기"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function MatchPage() {
    return (
        <Suspense fallback={<MatchPageSkeleton />}>
            <MatchPageContent />
        </Suspense>
    );
}
