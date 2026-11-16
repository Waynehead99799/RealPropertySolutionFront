import React, { useCallback, useEffect, useRef, useState } from "react";
import { CategoryKey } from "src/config/site";
import { cloudinary } from "src/lib/properties";
import {
    ChevronIcon,
    ChevronLeftIcon,
    CloseIcon,
    AreaIcon,
} from "src/components/ui/Icons";
import { NoPhoto } from "./PropertyCard";

interface GalleryProps {
    images: string[];
    /** Native widths, same order. Used so nothing is ever shown larger than it is. */
    widths: number[];
    alt: string;
    category: CategoryKey;
}

/**
 * Detail-page gallery. Only photographs that are sharp enough ever reach this
 * component (see curateImages); every URL is capped at its native width.
 */
export const Gallery = ({ images, widths, alt, category }: GalleryProps) => {
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [origin, setOrigin] = useState("50% 50%");
    const triggerRef = useRef<HTMLElement | null>(null);
    const dialogRef = useRef<HTMLDivElement>(null);
    const touchX = useRef<number | null>(null);
    const count = images.length;

    const go = useCallback(
        (d: number) => setIndex((i) => (i + d + count) % count),
        [count],
    );

    const openAt = (i: number, el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        setOrigin(
            `${Math.round(r.left + r.width / 2)}px ${Math.round(
                r.top + r.height / 2,
            )}px`,
        );
        triggerRef.current = el;
        setIndex(i);
        setOpen(true);
    };

    const close = useCallback(() => {
        setOpen(false);
        triggerRef.current?.focus();
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
            else if (e.key === "ArrowRight") go(1);
            else if (e.key === "ArrowLeft") go(-1);
            else if (e.key === "Tab" && dialogRef.current) {
                const f = Array.from(
                    dialogRef.current.querySelectorAll<HTMLElement>("button"),
                );
                if (!f.length) return;
                const first = f[0];
                const last = f[f.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [open, close, go]);

    if (!count) {
        return (
            <div className="crop">
                <div className="aspect-[16/10] bg-concrete">
                    <NoPhoto
                        listing={{ category }}
                        label="Representative image · site photos on request"
                    />
                </div>
            </div>
        );
    }

    const native = widths[index] || 1200;
    const w = Math.min(1280, native);

    return (
        <div>
            <div className="crop group relative">
                <button
                    type="button"
                    onClick={(e) => openAt(index, e.currentTarget)}
                    className="media-zoom relative block aspect-[4/3] w-full bg-concrete sm:aspect-[16/10]"
                    aria-label={`Open photo ${
                        index + 1
                    } of ${count} full screen`}
                >
                    <img
                        key={index}
                        src={cloudinary(images[index], w)}
                        srcSet={[800, 1280]
                            .filter((x) => x <= native)
                            .map((x) => `${cloudinary(images[index], x)} ${x}w`)
                            .join(", ")}
                        sizes="(min-width:1024px) 860px, 100vw"
                        alt={`${alt}, photo ${index + 1}`}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                        className="fade-in h-full w-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 inline-flex items-center gap-1.5 bg-ink px-3 py-2 font-display text-[18px] font-extrabold uppercase leading-none tracking-[0.06em] text-white">
                        <AreaIcon size={14} /> {index + 1} / {count}
                    </span>
                </button>
                {count > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={() => go(-1)}
                            aria-label="Previous photo"
                            className="absolute left-0 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white text-ink transition-colors hover:bg-ink hover:text-white"
                        >
                            <ChevronLeftIcon size={24} />
                        </button>
                        <button
                            type="button"
                            onClick={() => go(1)}
                            aria-label="Next photo"
                            className="absolute right-0 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white text-ink transition-colors hover:bg-ink hover:text-white"
                        >
                            <ChevronIcon size={24} />
                        </button>
                    </>
                )}
            </div>

            {count > 1 && (
                <ul
                    className="no-scrollbar mt-5 flex snap-x gap-2 overflow-x-auto"
                    aria-label="Photo thumbnails"
                >
                    {images.map((src, i) => (
                        <li key={src} className="shrink-0 snap-start">
                            <button
                                type="button"
                                onClick={() => setIndex(i)}
                                aria-label={`Show photo ${i + 1}`}
                                aria-current={i === index}
                                className={`block h-[68px] w-[96px] overflow-hidden border-2 transition-[border-color,opacity] duration-150 ${
                                    i === index
                                        ? "border-crimson"
                                        : "border-transparent opacity-70 hover:opacity-100"
                                }`}
                            >
                                <img
                                    src={cloudinary(src, 192, 136)}
                                    width={96}
                                    height={68}
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                    className="h-full w-full object-cover"
                                />
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {open && (
                <div
                    ref={dialogRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${alt} photo gallery`}
                    className="fixed inset-0 z-[70] flex flex-col bg-ink/95"
                    onTouchStart={(e) =>
                        (touchX.current = e.touches[0].clientX)
                    }
                    onTouchEnd={(e) => {
                        if (touchX.current === null) return;
                        const dx = e.changedTouches[0].clientX - touchX.current;
                        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
                        touchX.current = null;
                    }}
                >
                    <div className="flex items-center justify-between px-4 py-3 text-white">
                        <p className="tnum font-display text-[24px] font-extrabold uppercase tracking-[0.06em]">
                            {index + 1} / {count}
                        </p>
                        <button
                            type="button"
                            onClick={close}
                            aria-label="Close gallery"
                            className="inline-flex h-11 w-11 items-center justify-center hover:bg-white/10"
                        >
                            <CloseIcon size={26} />
                        </button>
                    </div>
                    <div
                        className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-6 sm:px-16"
                        onClick={(e) => e.target === e.currentTarget && close()}
                    >
                        <img
                            key={index}
                            src={cloudinary(images[index], 1800)}
                            alt={`${alt}, photo ${index + 1}`}
                            style={{ transformOrigin: origin }}
                            className="pop-in max-h-full max-w-full object-contain"
                        />
                        {count > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => go(-1)}
                                    aria-label="Previous photo"
                                    className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/10 text-white hover:bg-white/25 sm:inline-flex"
                                >
                                    <ChevronLeftIcon size={26} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => go(1)}
                                    aria-label="Next photo"
                                    className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/10 text-white hover:bg-white/25 sm:inline-flex"
                                >
                                    <ChevronIcon size={26} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
