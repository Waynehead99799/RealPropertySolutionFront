import React from "react";
import {
    PHOTO_POSITION,
    PLOT_LAYOUT_PHOTOS,
    PhotoKey,
    photoMaxWidth,
    photoSrc,
    photoSrcSet,
} from "src/lib/photos";
import { PlotLayout } from "./PlotLayout";

interface PhotoProps {
    name: PhotoKey;
    alt?: string;
    className?: string;
    sizes?: string;
    priority?: boolean;
    /** Override the default focal point, e.g. "50% 30%". */
    position?: string;
    /** Plot photos draw their layout lines; turn off for tiny thumbnails. */
    layout?: boolean;
}

/**
 * Responsive photograph from public/photos with a sensible focal point.
 * Needs a positioned parent: the plot photos draw their layout over it.
 */
export const Photo = ({
    name,
    alt = "",
    className = "h-full w-full object-cover",
    sizes = "100vw",
    priority = false,
    position,
    layout: showLayout = true,
}: PhotoProps) => {
    const layout = showLayout ? PLOT_LAYOUT_PHOTOS[name] : undefined;
    return (
        <>
            <img
                src={photoSrc(name, Math.min(1920, photoMaxWidth(name)))}
                srcSet={photoSrcSet(name)}
                sizes={sizes}
                alt={alt}
                aria-hidden={alt ? undefined : true}
                width={1920}
                height={973}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                className={className}
                style={{ objectPosition: position || PHOTO_POSITION[name] }}
                {...(priority
                    ? ({ fetchpriority: "high" } as Record<string, string>)
                    : {})}
            />
            {layout && <PlotLayout variant={layout} />}
        </>
    );
};
