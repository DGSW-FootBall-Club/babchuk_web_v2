import Image, { StaticImageData } from "next/image";

type HoloCardProps = {
    title: string;
    description: string;
    image: StaticImageData;
    imageAlt?: string;
    action?: () => void;
};

export default function HoloCard({
    title,
    description,
    image,
    imageAlt = "",
    action,
}: HoloCardProps) {
    return (
        <div
            className="holo-card flex h-full w-120 flex-col gap-4 rounded-lg bg-white/80 p-16 shadow-md cursor-pointer"
            onClick={action}
        >
            <h2 className="text-5xl font-bold">{title}</h2>
            <p className="text-2xl">{description}</p>
            <div className="flex min-h-0 flex-1 items-end justify-end">
                <Image
                    src={image}
                    alt={imageAlt}
                    width={200}
                    height={200}
                    className="object-contain"
                />
            </div>
        </div>
    );
}
