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
            className="holo-card flex min-h-[16rem] flex-col gap-3 rounded-xl bg-white/80 p-5 shadow-md sm:min-h-[20rem] sm:gap-4 sm:p-8"
        >
            <h2 className="text-2xl font-bold sm:text-3xl xl:text-4xl">
                {title}
            </h2>
            <p className="text-base sm:text-lg xl:text-xl">{description}</p>
            <div className="flex min-h-28 flex-1 items-end justify-end sm:min-h-36">
                <Image
                    src={image}
                    alt={imageAlt}
                    width={200}
                    height={200}
                    className="h-auto max-h-28 w-auto max-w-full object-contain sm:max-h-36 xl:max-h-44"
                />
            </div>
        </Link>
    );
}
