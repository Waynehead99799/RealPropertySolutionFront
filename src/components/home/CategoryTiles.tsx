import Link from "next/link";
import React from "react";
import { CATEGORIES, CATEGORY_KEYS } from "src/config/site";
import { TILE_FOR_CATEGORY } from "src/lib/photos";
import { Photo } from "src/components/ui/Photo";

/**
 * Four categories. The photograph sits on top, clean and uncovered, so you can
 * see exactly what kind of place it is; the label panel below turns crimson
 * on hover.
 */
export const CategoryTiles = ({
    counts,
}: {
    counts: Record<string, number>;
}) => (
    <div className="grid border-l-2 border-t-2 border-ink md:grid-cols-2 xl:grid-cols-4">
        {CATEGORY_KEYS.map((k, ti) => {
            const c = CATEGORIES[k];
            const n = counts[k] || 0;
            return (
                <div key={k} data-fx="up" style={{ ["--d" as string]: ti % 2 }}>
                    <Link href={`/${k}`}>
                        <a className="group tap flex h-full flex-col border-b-2 border-r-2 border-ink bg-white">
                            <div
                                data-fx="zoom"
                                className="relative aspect-[4/3] overflow-hidden bg-ink"
                            >
                                <Photo
                                    name={TILE_FOR_CATEGORY[k]}
                                    sizes="(min-width:1280px) 25vw, (min-width:768px) 50vw, 100vw"
                                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                                    position="50% 50%"
                                />
                                <span className="board absolute left-0 top-0 !text-[17px]">
                                    {n ? `${n} listed` : "Ask for options"}
                                </span>
                            </div>
                            <div className="flex flex-1 flex-col p-6 text-ink transition-colors duration-300 group-hover:bg-crimson group-hover:text-white sm:p-7">
                                <span className="block font-display text-[clamp(2.4rem,3.1vw,3.2rem)] font-extrabold uppercase leading-[0.92]">
                                    {c.label}
                                </span>
                                <span className="mt-3 block text-[16px] leading-relaxed text-slate-600 transition-colors group-hover:text-white/90">
                                    {c.blurb.split(".")[0]}.
                                </span>
                                <span className="mt-auto inline-flex items-center gap-2 pt-5 font-display text-[20px] font-extrabold uppercase tracking-[0.06em]">
                                    Browse {c.label.toLowerCase()}
                                    <span
                                        aria-hidden
                                        className="transition-transform duration-200 group-hover:translate-x-1"
                                    >
                                        ›
                                    </span>
                                </span>
                            </div>
                        </a>
                    </Link>
                </div>
            );
        })}
    </div>
);
