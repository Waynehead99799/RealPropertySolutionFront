import Link from "next/link";
import React from "react";
import { SITE } from "src/config/site";
import { formatNumber, waLink } from "src/lib/format";
import { Listing } from "src/lib/properties";
import { track } from "src/lib/analytics";
import { WhatsAppIcon } from "src/components/ui/Icons";
import { ListingImage, Price, SaveButton, Tags } from "./PropertyCard";

const Row = ({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) => (
    <div className="flex items-baseline justify-between gap-4 border-b border-concrete-300 py-2.5">
        <dt className="text-[15px] text-slate-500">{label}</dt>
        <dd className="text-right text-[16px] font-semibold text-ink">
            {children}
        </dd>
    </div>
);

/**
 * Portfolio poster: one listing presented like a project hoarding, a large
 * photograph on one side and the plate (name, price, key facts) on the other.
 */
export const Poster = ({
    listing: l,
    index,
}: {
    listing: Listing;
    index: number;
}) => {
    const flip = index % 2 === 1;
    const waText = `Hi, I'm interested in ${l.name} (${l.ref}). ${SITE.url}${l.path}`;
    return (
        <article className="relative border-2 border-ink bg-white">
            <div className="grid lg:grid-cols-12">
                <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
                    <div className="media-zoom group relative aspect-[4/3] bg-concrete lg:aspect-auto lg:h-full lg:min-h-[500px]">
                        <ListingImage
                            l={l}
                            sizes="(min-width:1024px) 800px, 100vw"
                        />
                        <div className="absolute left-0 top-0 p-4">
                            <Tags l={l} />
                        </div>
                    </div>
                </div>
                <div
                    className={`flex flex-col p-6 sm:p-9 lg:col-span-5 ${
                        flip ? "lg:order-1 lg:border-r-2" : "lg:border-l-2"
                    } border-t-2 border-ink lg:border-t-0`}
                >
                    <div className="flex items-start justify-between gap-3">
                        <p className="tnum text-[15px] font-semibold text-slate-500">
                            {l.ref} · {l.kind}
                        </p>
                        <SaveButton l={l} className="-mr-2 -mt-2" />
                    </div>
                    <h3 className="mt-2 font-display text-[clamp(2.6rem,5vw,4.4rem)] font-extrabold uppercase leading-[0.9] text-ink">
                        <Link href={l.path}>
                            <a className="hover:text-crimson">{l.name}</a>
                        </Link>
                    </h3>
                    <p className="mt-3 text-[17px] text-slate-600">
                        {l.locality || "Ahmedabad"}
                    </p>

                    <div className="mt-6">
                        <Price
                            l={l}
                            className="text-[clamp(3rem,5.5vw,5rem)]"
                        />
                        {l.perSqft && (
                            <p className="tnum mt-2 text-[15px] font-medium text-slate-500">
                                {l.perSqft}
                            </p>
                        )}
                    </div>

                    <dl className="mt-6">
                        {l.sqft && (
                            <Row label="Area">
                                <span className="tnum">
                                    {formatNumber(l.sqft)} sq ft
                                </span>
                            </Row>
                        )}
                        {l.furnishing && (
                            <Row label="Furnishing">{l.furnishing}</Row>
                        )}
                        {l.beds && <Row label="Bedrooms">{l.beds}</Row>}
                        <Row label="Available for">
                            {l.deal === "rent" ? "Lease or rent" : "Sale"}
                        </Row>
                    </dl>

                    <div className="mt-auto flex flex-wrap gap-3 pt-7">
                        <Link href={l.path}>
                            <a className="btn btn-primary">View details</a>
                        </Link>
                        <a
                            href={waLink(SITE.whatsapp, waText)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                                track("Contact", {
                                    channel: "whatsapp",
                                    content_ids: [l.id],
                                    location: "poster",
                                })
                            }
                            className="btn btn-outline"
                        >
                            <WhatsAppIcon size={18} /> Ask
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
};
