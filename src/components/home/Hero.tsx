import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SITE } from "src/config/site";
import { track } from "src/lib/analytics";
import { waLink } from "src/lib/format";
import { Listing, cloudinary } from "src/lib/properties";
import { photoSrc } from "src/lib/photos";
import { Photo } from "src/components/ui/Photo";
import { WhatsAppIcon } from "src/components/ui/Icons";

/** Hero photograph: new apartment developments on the edge of Ahmedabad, from the air. */
export const HERO_PHOTO = {
    key: "aero-residential" as const,
    preload: photoSrc("aero-residential", 1920),
    alt: "Aerial view of new apartment blocks and towers under construction on the edge of Ahmedabad",
};

const WANTS = [
    { v: "sale", l: "buy" },
    { v: "rent", l: "lease" },
];
const WHATS = [
    { v: "commercial", l: "an office or shop" },
    { v: "warehouse", l: "a warehouse" },
    { v: "residential", l: "a home" },
    { v: "land", l: "a plot" },
    { v: "", l: "anything" },
];

/** Select styled as a word inside a sentence. Width follows the chosen label. */
const Blank = ({
    id,
    label,
    value,
    onChange,
    options,
}: {
    id: string;
    label: string;
    value: string;
    onChange: (v: string) => void;
    options: { v: string; l: string }[];
}) => {
    const chosen = options.find((o) => o.v === value)?.l || "";
    return (
        <span className="relative inline-block align-baseline">
            <label htmlFor={id} className="sr-only">
                {label}
            </label>
            {/* invisible copy of the chosen text sizes the box exactly, on any screen */}
            <span
                aria-hidden
                className="invisible block whitespace-pre border-b-[5px] border-transparent pl-[0.1em] pr-[0.85em] leading-[1.05]"
            >
                {chosen || label}
            </span>
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer appearance-none border-0 border-b-[5px] border-crimson bg-transparent p-0 pl-[0.1em] pr-[0.85em] font-display font-extrabold uppercase leading-[1.05] text-ink transition-colors hover:bg-crimson-soft"
            >
                {options.map((o) => (
                    <option key={o.v || "any"} value={o.v}>
                        {o.l}
                    </option>
                ))}
            </select>
            <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="pointer-events-none absolute right-0 top-1/2 h-[0.5em] w-[0.5em] -translate-y-1/2 text-crimson"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
            >
                <path d="m5 9 7 7 7-7" />
            </svg>
        </span>
    );
};

export const Hero = ({
    areaOptions,
    latest,
}: {
    areaOptions: { slug: string; name: string }[];
    latest?: Listing | null;
}) => {
    const router = useRouter();
    const [deal, setDeal] = useState("sale");
    const [what, setWhat] = useState("commercial");
    const [area, setArea] = useState("");

    const areas = [
        { v: "", l: "anywhere in ahmedabad" },
        ...areaOptions.map((a) => ({ v: a.slug, l: a.name.toLowerCase() })),
    ];

    const go = (e: React.FormEvent) => {
        e.preventDefault();
        const q: Record<string, string> = { deal };
        if (what) q.category = what;
        if (area) q.area = area;
        track("Search", { search_string: `${deal} ${what} ${area}`.trim() });
        router.push({ pathname: "/properties", query: q });
    };

    return (
        <section aria-labelledby="hero-h">
            {/* Full-bleed aerial. The crimson hoarding sheet lifts off it on load. */}
            <div className="relative isolate min-h-[680px] bg-ink lg:min-h-[calc(100svh-72px)] lg:max-h-[900px]">
                <div className="unveil absolute inset-0">
                    <Photo
                        name={HERO_PHOTO.key}
                        alt={HERO_PHOTO.alt}
                        priority
                        className="h-full w-full object-cover"
                        position="50% 55%"
                    />
                </div>
                <div
                    aria-hidden
                    className="absolute inset-0 z-[1]"
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(17,18,20,0.74) 0%, rgba(17,18,20,0.42) 55%, rgba(17,18,20,0.12) 100%), linear-gradient(180deg, rgba(17,18,20,0.15) 0%, rgba(17,18,20,0) 40%, rgba(17,18,20,0.6) 100%)",
                    }}
                />

                {latest && (
                    <div
                        className="rise absolute right-10 top-12 z-[3] hidden w-[300px] xl:block"
                        style={{ ["--i" as string]: 8 }}
                    >
                        <Link href={latest.path}>
                            <a className="group block border-2 border-white bg-ink/90 p-3 text-white transition-colors duration-200 hover:bg-crimson">
                                <div className="relative aspect-[3/2] overflow-hidden bg-concrete">
                                    {latest.cover && (
                                        <img
                                            src={cloudinary(
                                                latest.cover,
                                                600,
                                                400,
                                            )}
                                            width={300}
                                            height={200}
                                            alt=""
                                            className="h-full w-full object-cover"
                                        />
                                    )}
                                    <span className="board absolute left-0 top-0">
                                        Latest listing
                                    </span>
                                </div>
                                <p className="tnum mt-3 text-[13px] font-semibold text-white/75">
                                    {latest.ref} · {latest.kind}
                                </p>
                                <p className="font-display text-[34px] font-extrabold uppercase leading-[0.95]">
                                    {latest.name}
                                </p>
                                <p className="tnum mt-1 font-display text-[36px] font-black leading-none">
                                    {latest.priceLabel}
                                    {latest.priceSuffix && (
                                        <span className="ml-1.5 font-sans text-[13px] font-semibold text-white/75">
                                            {latest.priceSuffix}
                                        </span>
                                    )}
                                </p>
                                <span className="mt-2 inline-block text-[14px] font-semibold underline underline-offset-4">
                                    View details
                                </span>
                            </a>
                        </Link>
                    </div>
                )}

                <div className="shell relative z-[3] flex min-h-[680px] flex-col justify-end pb-24 pt-12 lg:min-h-[calc(100svh-72px)] lg:max-h-[900px] lg:pb-32">
                    <h1 id="hero-h" className="display display-xl !text-white">
                        <span className="line">
                            <span style={{ ["--i" as string]: 0 }}>
                                Offices &amp; shops.
                            </span>
                        </span>
                        <span className="line">
                            <span style={{ ["--i" as string]: 1 }}>
                                Warehouses.
                            </span>
                        </span>
                        <span className="line">
                            <span style={{ ["--i" as string]: 2 }}>
                                Homes &amp; plots.
                            </span>
                        </span>
                    </h1>

                    <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
                        <p
                            className="rise max-w-[52ch] text-[19px] leading-[1.6] text-white/90 lg:col-span-7 lg:text-[21px]"
                            style={{ ["--i" as string]: 5 }}
                        >
                            Real Property Solution is a Thaltej-based
                            dealership. We lease and sell across Ahmedabad, and
                            we show the price and the price per sq ft before you
                            have to ask.
                        </p>
                        <div
                            className="rise flex flex-wrap gap-3 lg:col-span-5 lg:justify-end"
                            style={{ ["--i" as string]: 6 }}
                        >
                            <Link href="/properties">
                                <a className="btn btn-primary btn-lg">
                                    View portfolio
                                </a>
                            </Link>
                            <a
                                href={waLink(
                                    SITE.whatsapp,
                                    "Hi, I'm looking for a property in Ahmedabad.",
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() =>
                                    track("Contact", {
                                        channel: "whatsapp",
                                        location: "hero",
                                    })
                                }
                                className="btn btn-whatsapp btn-lg"
                            >
                                <WhatsAppIcon size={22} /> WhatsApp us
                            </a>
                        </div>
                    </div>
                    <Link href="/photo-credits">
                        <a className="absolute bottom-3 right-5 hidden text-[12px] text-white/60 underline-offset-4 hover:text-white hover:underline sm:block">
                            Aerial photo credit
                        </a>
                    </Link>
                </div>
            </div>

            {/* Sentence-style search: say what you want, get the portfolio */}
            <form
                id="find"
                onSubmit={go}
                aria-label="Find a property"
                className="shell relative z-10 -mt-14 pb-4 sm:-mt-16 sm:pb-8"
            >
                <div className="border-2 border-ink bg-white p-5 shadow-plate sm:p-8">
                    <p className="font-display text-[clamp(1.55rem,4.2vw,3.6rem)] font-extrabold uppercase leading-[1.25] text-ink">
                        I want to{" "}
                        <Blank
                            id="hs-deal"
                            label="Buy or lease"
                            value={deal}
                            onChange={setDeal}
                            options={WANTS}
                        />{" "}
                        <Blank
                            id="hs-what"
                            label="Property type"
                            value={what}
                            onChange={setWhat}
                            options={WHATS}
                        />{" "}
                        in{" "}
                        <Blank
                            id="hs-area"
                            label="Area"
                            value={area}
                            onChange={setArea}
                            options={areas}
                        />
                    </p>
                    <button type="submit" className="btn btn-dark btn-lg mt-6">
                        Show me
                    </button>
                </div>
            </form>
        </section>
    );
};
