import MatchForm from "@/components/match/MatchForm";

export default function CreateMatchPage() {
    return (
        <div className="min-h-full mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:gap-10 lg:px-8 lg:py-10">
            <MatchForm />
        </div>
    );
}
