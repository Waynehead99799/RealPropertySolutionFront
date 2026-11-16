import Link from "next/link";
import React from "react";
import { BANNER_POSITION, PLOT_LAYOUT_PHOTOS, PhotoKey } from "src/lib/photos";
import { Photo } from "src/components/ui/Photo";
import { PlotLayout } from "src/components/ui/PlotLayout";

export interface Crumb {
    name: string;
    href?: string;
}

export const Breadcrumbs = ({
    crumbs,
    light = false,
}: {
    crumbs: Crumb[];
    light?: boolean;
}) => (
    <nav aria-label="Breadcrumb">
        <ol
            className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] font-semibold ${
                light ? "text-white/75" : "text-slate-500"
            }`}
        >
            {crumbs.map((c, i) => {
                const last = i === crumbs.length - 1;
                return (
                    <li
                        key={`${c.name}-${i}`}
                        className="flex items-center gap-2"
                    >
                        {c.href && !last ? (
                            <Link href={c.href}>
                                <a
                                    className={
                                        light
                                            ? "hover:text-white"
                                            : "hover:text-crimson"
                                    }
                                >
                                    {c.name}
                                </a>
                            </Link>
                        ) : (
                            <span
                                aria-current={last ? "page" : undefined}
                                className={light ? "text-white" : "text-ink"}
                            >
                                {c.name}
                            </span>
                        )}
                        {!last && (
                            <span aria-hidden className="opacity-50">
                                /
                            </span>
                        )}
                    </li>
                );
            })}
        </ol>
    </nav>
);

interface Props {
    title: string;
    blurb?: string;
    crumbs?: Crumb[];
    /** Real photograph shown behind the title (public/photos). */
    image?: PhotoKey;
    children?: React.ReactNode;
}

/**
 * Inner-page header: the title set big over an aerial photograph of the
 * place the page is about, like a project hoarding.
 */
export const PageHead = ({
    title,
    blurb,
    crumbs,
    image = "aero-sabarmati",
    children,
}: Props) => (
    <section className="relative isolate overflow-hidden border-b-2 border-ink bg-ink">
        <Photo
            name={image}
            priority
            className="absolute inset-0 h-full w-full object-cover"
            sizes="100vw"
            position={BANNER_POSITION[image]}
            layout={false}
        />
        <div aria-hidden className="banner-shade absolute inset-0" />
        {/* drawn above the shade so the plot lines stay bright */}
        {PLOT_LAYOUT_PHOTOS[image] && (
            <PlotLayout variant={PLOT_LAYOUT_PHOTOS[image] || "banner"} />
        )}
        <div
            className={`shell relative pt-10 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16 ${
                image === "banner-plots" ? "pb-36" : "pb-12"
            }`}
        >
            {crumbs && (
                <div className="mb-6">
                    <Breadcrumbs crumbs={crumbs} light />
                </div>
            )}
            <h1 className="display display-lg max-w-[18ch] !text-white">
                <span className="line">
                    <span>{title}</span>
                </span>
            </h1>
            {blurb && (
                <p
                    className="rise mt-5 max-w-[58ch] text-[19px] leading-[1.65] text-white/90"
                    style={{ ["--i" as string]: 3 }}
                >
                    {blurb}
                </p>
            )}
            {children}
        </div>
    </section>
);
