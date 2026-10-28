"use client";

type MatchTimePickerProps = {
    value: string;
    onChange: (value: string) => void;
    name?: string;
};

const QUICK_TIMES = [
    { label: "점축", value: "13:05" },
    { label: "저축", value: "18:40" },
];

export default function MatchTimePicker({
    value,
    onChange,
    name = "time",
}: MatchTimePickerProps) {
    return (
        <div className="flex flex-col gap-3">
            <input
                type="time"
                name={name}
                aria-label="시간 직접 선택"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                required
                className="w-full rounded-lg bg-white p-3 text-black outline-none ring-0 transition focus:border focus:border-slate-300 sm:p-4"
            />
            <div className="flex flex-wrap gap-2">
                {QUICK_TIMES.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        aria-pressed={value === option.value}
                        onClick={() => onChange(option.value)}
                        className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                            value === option.value
                                ? "border-slate-900 bg-slate-900 text-white"
                                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                    >
                        {option.label} {option.value}
                    </button>
                ))}
            </div>
        </div>
    );
}
