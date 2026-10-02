import Image, { StaticImageData } from "next/image";

type HistoryGalleryItemProps = {
    image: StaticImageData;
    title: string;
    subtitle?: string;
    alt?: string;
    imageClassName?: string;
};

export default function HistoryGalleryItem({
    image,
    title,
    subtitle,
    alt,
    imageClassName = "",
}: HistoryGalleryItemProps) {
    return (
        <article className="w-full overflow-hidden rounded-xl">
            <div className="relative h-70 w-full overflow-hidden sm:h-80">
                <Image
                    src={image}
                    alt={alt ?? title}
                    fill
                    className={`object-cover ${imageClassName}`}
                    sizes="(max-width: 768px) 100vw, 768px"
                />
            </div>

            <div className="flex flex-col gap-1 py-4">
                <h2 className="text-lg font-semibold text-white sm:text-2xl">
                    {title}
                </h2>
                {subtitle ? (
                    <p className="text-sm text-slate-300 sm:text-base">
                        {subtitle}
                    </p>
                ) : null}
            </div>
        </article>
    );
}
