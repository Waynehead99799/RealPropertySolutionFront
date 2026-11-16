import Link from "next/link";
import React from "react";
import { SITE } from "src/config/site";
import { formatNumber, telLink, waLink } from "src/lib/format";
import { Listing, cloudinary, cloudinarySrcSet } from "src/lib/properties";
import { SavedItem, useShortlist } from "src/lib/shortlist";
import { track } from "src/lib/analytics";
import { Photo } from "src/components/ui/Photo";
import { TILE_FOR_CATEGORY } from "src/lib/photos";
import {
    AreaIcon,
    BathIcon,
    BedIcon,
    FloorsIcon,
    HeartIcon,
    PhoneIcon,
    PinIcon,
    SofaIcon,
    WhatsAppIcon,
} from "src/components/ui/Icons";

export const toSaved = (l: Listing): SavedItem => ({
    id: l.id,
    ref: l.ref,
    name: l.name,
    path: l.path,
    priceLabel: l.priceLabel,
    priceSuffix: l.priceSuffix,
    locality: l.locality,
    dealLabel: l.dealLabel,
    cover: l.cover,
});

/**
 * Stand-in for listings without a photograph of their own: a real photograph
 * of that kind of place, always labelled as representative so nobody mistakes
 * it for the property.
 */
export const NoPhoto = ({
    listing,
    label = "Representative image · photos on request",
}: {
    listing?: Pick<Listing, "category">;
    label?: string;
}) => (
    <div className="relative h-full w-full bg-ink">
        <Photo
            name={TILE_FOR_CATEGORY[listing?.category || "commercial"]}
            sizes="(min-width:1024px) 800px, 100vw"
            className="h-full w-full object-cover"
        />
        <span className="absolute bottom-0 left-0 max-w-full bg-ink px-2.5 py-1.5 font-display text-[13px] font-extrabold uppercase leading-tight tracking-[0.06em] text-white sm:text-[15px] sm:tracking-[0.08em]">
            {label}
        </span>
    </div>
);

export const ListingImage = ({
    l,
    sizes,
    priority = false,
}: {
    l: Listing;
    sizes: string;
    priority?: boolean;
}) =>
    l.cover ? (
        <img
            src={cloudinary(l.cover, 800, 600)}
            srcSet={cloudinarySrcSet(
                l.cover,
                [400, 640, 800, 1000].filter((w) => w <= l.coverW + 1),
                0.75,
            )}
            sizes={sizes}
            width={800}
            height={600}
            alt={`${l.name}, ${l.kind.toLowerCase()} ${
                l.deal === "rent" ? "for rent" : "for sale"
            }${l.locality ? ` in ${l.locality}` : ""}`}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover"
        />
    ) : (
        <NoPhoto listing={l} />
    );

export const Tags = ({ l }: { l: Listing }) => (
    <div className="flex flex-wrap gap-1.5">
        <span className="board">{l.dealLabel}</span>
        {l.preLeased && <span className="board board-navy">Pre-leased</span>}
    </div>
);

export const SaveButton = ({
    l,
    className = "",
}: {
    l: Listing;
    className?: string;
}) => {
    const { has, toggle } = useShortlist();
    const saved = has(l.id);
    return (
        <button
            type="button"
            onClick={() => toggle(toSaved(l))}
            aria-pressed={saved}
            aria-label={
                saved
                    ? `Remove ${l.name} from shortlist`
                    : `Save ${l.name} to shortlist`
            }
            className={`inline-flex h-11 w-11 items-center justify-center bg-white text-ink transition-transform duration-200 hover:scale-105 active:scale-95 ${className}`}
        >
            <HeartIcon
                size={20}
                style={{ transition: "fill 200ms ease, color 200ms ease" }}
                className={saved ? "text-crimson" : ""}
                fill={saved ? "currentColor" : "none"}
            />
        </button>
    );
};

const Spec = ({
    icon,
    children,
}: {
    icon: React.ReactNode;
    children: React.ReactNode;
}) => (
    <li className="flex items-center gap-1.5 text-[15px] font-medium text-slate-600">
        <span className="text-ink">{icon}</span>
        {children}
    </li>
);

export const SpecList = ({ l }: { l: Listing }) => (
    <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
        {l.sqft && (
            <Spec icon={<AreaIcon size={17} />}>
                <span className="tnum">{formatNumber(l.sqft)}</span> sq ft
            </Spec>
        )}
        {l.furnishing && (
            <Spec icon={<SofaIcon size={17} />}>{l.furnishing}</Spec>
        )}
        {l.beds && <Spec icon={<BedIcon size={17} />}>{l.beds} beds</Spec>}
        {l.baths && <Spec icon={<BathIcon size={17} />}>{l.baths} baths</Spec>}
        {l.floors && (
            <Spec icon={<FloorsIcon size={17} />}>{l.floors} floors</Spec>
        )}
    </ul>
);

export const Price = ({
    l,
    className = "text-[44px]",
}: {
    l: Listing;
    className?: string;
}) => (
    <p
        className={`tnum font-display font-extrabold leading-none text-ink ${className}`}
    >
        {l.priceLabel}
        {l.priceSuffix && (
            <span className="ml-2 font-sans text-[15px] font-semibold text-slate-500">
                {l.priceSuffix}
            </span>
        )}
    </p>
);

interface CardProps {
    listing: Listing;
    priority?: boolean;
}

export const PropertyCard = ({ listing: l, priority = false }: CardProps) => {
    const waText = `Hi, I'm interested in ${l.name} (${l.ref})${
        l.locality ? `, ${l.locality}` : ""
    }, ${l.dealLabel.toLowerCase()}. ${SITE.url}${l.path}`;

    return (
        <article data-fx="up" className="group relative">
            <div className="crop mb-1">
                <div className="media-zoom relative aspect-[4/3] bg-concrete">
                    <ListingImage
                        l={l}
                        priority={priority}
                        sizes="(min-width:1024px) 400px, (min-width:640px) 50vw, 100vw"
                    />
                    <div className="absolute left-0 top-0 p-3">
                        <Tags l={l} />
                    </div>
                    <SaveButton l={l} className="absolute right-3 top-3 z-20" />
                </div>
            </div>

            <div className="pt-5">
                <p className="tnum text-[14px] font-semibold text-slate-500">
                    {l.ref} · {l.kind}
                </p>
                <h3 className="mt-1 font-display text-[36px] font-extrabold uppercase leading-[0.95] tracking-[0.005em] text-ink">
                    <Link href={l.path}>
                        {/* stretched link: the whole card is clickable */}
                        <a className="after:absolute after:inset-0 after:z-10 hover:text-crimson">
                            {l.name}
                        </a>
                    </Link>
                </h3>
                <p className="mt-2 flex items-start gap-1.5 text-[16px] text-slate-600">
                    <PinIcon
                        size={16}
                        className="mt-[5px] shrink-0 text-crimson"
                    />
                    <span>{l.locality || "Ahmedabad"}</span>
                </p>

                <div className="mt-4 flex items-end justify-between gap-3 border-t-2 border-ink pt-4">
                    <Price l={l} className="text-[42px]" />
                    {l.perSqft && (
                        <p className="tnum pb-1 text-right text-[14px] font-medium leading-tight text-slate-500">
                            {l.perSqft}
                        </p>
                    )}
                </div>
                <div className="mt-3">
                    <SpecList l={l} />
                </div>

                <div className="relative z-20 mt-5 grid grid-cols-3 gap-2">
                    <a
                        href={telLink(SITE.phone)}
                        onClick={() =>
                            track("Contact", {
                                channel: "call",
                                content_ids: [l.id],
                                location: "card",
                            })
                        }
                        aria-label={`Call about ${l.name}`}
                        className="btn btn-outline btn-sm !px-2"
                    >
                        <PhoneIcon size={15} /> Call
                    </a>
                    <a
                        href={waLink(SITE.whatsapp, waText)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                            track("Contact", {
                                channel: "whatsapp",
                                content_ids: [l.id],
                                location: "card",
                            })
                        }
                        aria-label={`WhatsApp about ${l.name}`}
                        className="btn btn-outline btn-sm !px-2 hover:!border-whatsapp hover:!bg-whatsapp"
                    >
                        <WhatsAppIcon size={16} /> Chat
                    </a>
                    <Link href={`${l.path}#enquire`}>
                        <a
                            aria-label={`Enquire about ${l.name}`}
                            className="btn btn-dark btn-sm !px-2"
                        >
                            Enquire
                        </a>
                    </Link>
                </div>
            </div>
        </article>
    );
};

export const PropertyCardSkeleton = () => (
    <div aria-hidden>
        <div className="skeleton aspect-[4/3]" />
        <div className="skeleton mt-4 h-9 w-2/5" />
        <div className="skeleton mt-3 h-5 w-3/4" />
    </div>
);
