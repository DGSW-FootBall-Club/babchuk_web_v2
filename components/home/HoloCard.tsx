import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type HoloCardProps = {
    title: string;
    description: string;
    image: StaticImageData;
    imageAlt?: string;
    router: string;
};

export default function HoloCard({
    title,
    description,
    image,
    imageAlt = "",
    router,
}: HoloCardProps) {
    return (
        <Link
            href={router}
            className="holo-card flex min-h-72 flex-col gap-3 rounded-lg bg-white/80 p-6 shadow-md sm:min-h-80 sm:gap-4 sm:p-8"
        >
            <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
            <p className="text-lg sm:text-xl">{description}</p>
            <div className="flex min-h-32 flex-1 items-end justify-end sm:min-h-40">
                <Image
                    src={image}
                    alt={imageAlt}
                    width={200}
                    height={200}
                    className="h-auto max-h-36 w-auto max-w-full object-contain sm:max-h-44"
                />
            </div>
        </Link>
    );
}
