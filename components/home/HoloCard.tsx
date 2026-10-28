"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";

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
    const handleMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const relativeX = (event.clientX - bounds.left) / bounds.width;
        const relativeY = (event.clientY - bounds.top) / bounds.height;
        const maxTilt = 9;

        event.currentTarget.style.setProperty(
            "--rotate-x",
            `${(0.5 - relativeY) * maxTilt}deg`,
        );
        event.currentTarget.style.setProperty(
            "--rotate-y",
            `${(relativeX - 0.5) * maxTilt}deg`,
        );
    };

    const handleMouseLeave = (event: MouseEvent<HTMLAnchorElement>) => {
        event.currentTarget.style.setProperty("--rotate-x", "0deg");
        event.currentTarget.style.setProperty("--rotate-y", "0deg");
    };

    return (
        <Link
            href={router}
            className="holo-card flex min-h-full self-start flex-col gap-3 rounded-xl bg-white/80 p-5 shadow-md sm:h-80 sm:gap-4 sm:p-8"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
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
