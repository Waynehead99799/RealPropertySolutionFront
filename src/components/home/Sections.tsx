import Link from "next/link";
import React from "react";
import { AREAS, CATEGORIES, CATEGORY_KEYS, FAQS, SITE } from "src/config/site";
import { track } from "src/lib/analytics";
import { telLink, waLink } from "src/lib/format";
import { Agent, Listing, areasInUse, cloudinary } from "src/lib/properties";
import { EnquiryForm } from "src/components/forms/EnquiryForm";
import { CategoryTiles } from "./CategoryTiles";
import { Photo } from "src/components/ui/Photo";
import { Poster } from "src/components/property/Poster";
import { Marquee } from "src/components/ui/Marquee";
import { CountUp, Reveal, useInView } from "src/components/ui/Reveal";
import { WordReveal } from "src/components/ui/WordReveal";
import {
    FacebookIcon,
    InstagramIcon,
    PhoneIcon,
    WhatsAppIcon,
} from "src/components/ui/Icons";

/* ---------- Ribbon ---------- */
export const Ribbon = () => (
    <div className="border-y-2 border-ink bg-ink py-3 text-white">
        <Marquee
            items={[
                "To let",
                "For sale",
                "Offices",
                "Shops",
                "Showrooms",
                "Warehouses",
                "Flats",
                "Bungalows",
                "Plots",
                "New projects",
            ]}
            itemClassName="font-display text-[30px] font-extrabold uppercase tracking-[0.06em]"
            dotClassName="bg-crimson"
        />
    </div>
);

/* ---------- Statement ---------- */
export const Statement = () => (
    <section className="section" aria-label="What we do">
        <div className="shell">
            <WordReveal
                as="p"
                className="display display-md max-w-[24ch] !text-[clamp(1.95rem,6.2vw,6rem)] !leading-[0.95]"
                text="We lease and sell offices, shops, warehouses, homes and plots across Ahmedabad. Every listing shows its price and its price per square foot, and every question gets a straight answer."
            />
        </div>
    </section>
);

/* ---------- Full-bleed panorama between statement and portfolio ---------- */
export const Panorama = () => (
    <section id="panorama" aria-hidden className="relative">
        <div className="relative h-[clamp(220px,30vw,460px)] overflow-hidden bg-ink">
            <Photo
                name="sg-highway"
                sizes="100vw"
                className="h-full w-full object-cover"
                position="50% 36%"
            />
            <div className="shell absolute inset-x-0 bottom-0">
                <span className="board board-ink !text-[18px]">
                    SG Highway, Ahmedabad
                </span>
            </div>
        </div>
    </section>
);

/* ---------- Live figures over an aerial, counted up once ---------- */
export const GlanceBand = ({
    listings,
    agents,
}: {
    listings: Listing[];
    agents: Agent[];
}) => {
    const items = [
        { n: listings.length, l: "Active listings" },
        { n: AREAS.length, l: "Areas we cover" },
        { n: CATEGORY_KEYS.length, l: "Property types" },
        { n: agents.length, l: "Consultants" },
    ].filter((i) => i.n > 0);
    return (
        <section
            id="glance"
            aria-label="At a glance"
            className="relative isolate overflow-hidden bg-ink text-white"
        >
            <Photo
                name="aero-farmland"
                sizes="100vw"
                className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45"
            />
            <div
                aria-hidden
                className="absolute inset-0 -z-10"
                style={{
                    background:
                        "linear-gradient(90deg, rgba(17,18,20,0.8) 0%, rgba(17,18,20,0.45) 100%)",
                }}
            />
            <div className="shell grid grid-cols-2 gap-x-6 gap-y-12 py-16 md:grid-cols-4 md:py-24">
                {items.map((i) => (
                    <div key={i.l} className="border-t-4 border-crimson pt-4">
                        <p className="font-display text-[clamp(4.2rem,9vw,8.4rem)] font-black leading-[0.9] text-white">
                            <CountUp to={i.n} />
                        </p>
                        <p className="mt-2 text-[17px] font-semibold text-white/85">
                            {i.l}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

/* ---------- Portfolio: posters stack as you scroll ---------- */
export const Portfolio = ({ listings }: { listings: Listing[] }) => {
    // Photographed listings lead; ones still waiting for photos follow.
    const featured = [
        ...listings.filter((l) => l.cover),
        ...listings.filter((l) => !l.cover),
    ].slice(0, 4);
    return (
        <section
            className="bg-concrete pb-16 pt-14 md:pb-24 md:pt-20"
            aria-labelledby="portfolio-h"
        >
            <div className="shell">
                <div className="flex flex-wrap items-end justify-between gap-5">
                    <h2
                        id="portfolio-h"
                        data-fx="up"
                        className="display display-lg"
                    >
                        Portfolio
                    </h2>
                    <div className="max-w-[44ch]">
                        <p className="text-[17px] text-slate-600">
                            Current listings, with the price and the price per
                            sq ft as they stand today.
                        </p>
                        <Link href="/properties">
                            <a className="btn btn-dark mt-4">
                                View all properties
                            </a>
                        </Link>
                    </div>
                </div>

                {featured.length ? (
                    <div className="mt-12 space-y-8 lg:space-y-10">
                        {featured.map((l, i) => (
                            <div
                                key={l.id}
                                className="lg:sticky"
                                style={{ top: `${92 + i * 14}px` }}
                            >
                                <Poster listing={l} index={i} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mt-12 border-2 border-ink bg-white p-10">
                        <p className="font-display text-[44px] font-extrabold uppercase leading-[0.95]">
                            New listings are being added
                        </p>
                        <p className="mt-3 text-slate-600">
                            Message us and we will share what is available.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

/* ---------- Four categories ---------- */
export const Categories = ({ listings }: { listings: Listing[] }) => {
    const counts: Record<string, number> = {};
    listings.forEach((l) => {
        counts[l.category] = (counts[l.category] || 0) + 1;
    });
    return (
        <section className="section" aria-labelledby="cat-h">
            <div className="shell">
                <h2
                    id="cat-h"
                    data-fx="up"
                    className="display display-lg max-w-[14ch]"
                >
                    What we deal in
                </h2>
                <div className="mt-12">
                    <CategoryTiles counts={counts} />
                </div>
            </div>
        </section>
    );
};

/* ---------- Areas as a wall of type ---------- */
export const AreasWall = ({ listings }: { listings: Listing[] }) => {
    const counts = new Map(areasInUse(listings).map((a) => [a.slug, a.count]));
    return (
        <section
            className="border-y-2 border-ink bg-white py-16 md:py-24"
            aria-labelledby="areas-h"
        >
            <div className="shell">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <h2
                        id="areas-h"
                        className="display display-lg max-w-[12ch]"
                    >
                        Where we work
                    </h2>
                    <p className="max-w-[40ch] text-[17px] text-slate-600">
                        From SG Highway's towers to the warehouse belt around
                        Aslali and Bareja. Pick an area to see what is there.
                    </p>
                </div>
                <ul className="mt-10 border-t-2 border-ink">
                    {AREAS.map((a, ai) => {
                        const n = counts.get(a.slug) || 0;
                        return (
                            <li
                                key={a.slug}
                                data-fx="left"
                                style={{ ["--d" as string]: ai % 4 }}
                                className="border-b-2 border-ink"
                            >
                                <Link href={`/areas/${a.slug}`}>
                                    <a className="group flex items-center justify-between gap-6 overflow-hidden py-3 transition-colors duration-200 hover:bg-concrete-50 sm:py-4">
                                        <span className="font-display text-[clamp(2.6rem,7vw,6.4rem)] font-extrabold uppercase leading-[0.95] text-ink transition-[transform,color] duration-300 ease-out group-hover:translate-x-4 group-hover:text-crimson">
                                            {a.name}
                                        </span>
                                        <span className="hidden max-w-[34ch] text-right text-[15px] leading-snug text-slate-600 md:block">
                                            {a.intro}
                                        </span>
                                        <span className="tnum shrink-0 bg-ink px-2.5 py-1.5 font-display text-[18px] font-extrabold uppercase leading-none tracking-[0.06em] text-white transition-colors group-hover:bg-crimson">
                                            {n ? `${n} listed` : "Ask us"}
                                        </span>
                                    </a>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

/* ---------- Process: a real sequence, drawn as a build line ---------- */
const STEPS = [
    {
        t: "Tell us",
        d: "Share the type, area, size and budget on WhatsApp, by phone or through the form.",
    },
    {
        t: "Shortlist",
        d: "We send matching listings with the price, price per sq ft and photos to compare.",
    },
    {
        t: "Visit",
        d: "We arrange site visits and help you negotiate with the owner or developer.",
    },
    {
        t: "Close",
        d: "We stay in touch until the deal is done, whether you are buying, leasing or selling.",
    },
];

export const Process = () => {
    const [ref, seen] = useInView<HTMLOListElement>(0.25);
    return (
        <section className="bg-ink section text-white" aria-labelledby="proc-h">
            <div className="shell">
                <h2
                    id="proc-h"
                    data-fx="up"
                    className="display display-lg max-w-[12ch] !text-white"
                >
                    How it works
                </h2>
                <ol
                    ref={ref}
                    className={`relative mt-10 grid gap-8 md:mt-14 md:grid-cols-4 md:gap-6 ${
                        seen ? "is-in" : ""
                    }`}
                >
                    <span
                        aria-hidden
                        className="draw-line absolute left-0 right-0 top-[30px] hidden h-[4px] bg-crimson md:block"
                    />
                    {STEPS.map((s, i) => (
                        <Reveal
                            as="li"
                            key={s.t}
                            delay={i}
                            className="relative flex gap-5 md:block"
                        >
                            <span className="tnum relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center bg-crimson font-display text-[34px] font-black leading-none text-white md:h-[60px] md:w-[60px] md:text-[40px]">
                                {i + 1}
                            </span>
                            <div>
                                <h3 className="font-display text-[36px] font-extrabold uppercase leading-none text-white md:mt-5 md:text-[44px]">
                                    {s.t}
                                </h3>
                                <p className="mt-2 max-w-[30ch] text-[16px] leading-relaxed text-white/70 md:mt-3">
                                    {s.d}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </ol>
            </div>
        </section>
    );
};

/* ---------- Team ---------- */
export const Team = ({ agents }: { agents: Agent[] }) => {
    if (!agents.length) return null;
    const lead = agents.find((a) => a.role.startsWith("Lead")) || agents[0];
    const rest = agents.filter((a) => a.id !== lead.id);
    const first = lead.name.split(" ")[0];
    return (
        <section className="section" aria-labelledby="team-h">
            <div className="shell grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
                <Reveal className="lg:col-span-5">
                    <div className="crop">
                        <div className="aspect-square bg-concrete">
                            {lead.image && (
                                <img
                                    src={cloudinary(
                                        lead.image,
                                        800,
                                        800,
                                        "face",
                                    )}
                                    alt={`${
                                        lead.name
                                    }, ${lead.role.toLowerCase()} at ${
                                        SITE.name
                                    }`}
                                    width={800}
                                    height={800}
                                    loading="lazy"
                                    decoding="async"
                                    className="h-full w-full object-cover"
                                />
                            )}
                        </div>
                    </div>
                </Reveal>
                <div className="lg:col-span-7">
                    <h2 id="team-h" data-fx="up" className="display display-lg">
                        Talk to {first}, not a call centre
                    </h2>
                    <p className="lede mt-5">
                        {lead.name} leads the team from our Thaltej office.
                        Message your requirement and the team will come back
                        with matching options and an honest view on price.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                        <a
                            href={waLink(
                                SITE.whatsapp,
                                `Hi ${first}, I'm looking for a property in Ahmedabad.`,
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                                track("Contact", {
                                    channel: "whatsapp",
                                    location: "team",
                                })
                            }
                            className="btn btn-whatsapp btn-lg"
                        >
                            <WhatsAppIcon size={22} /> WhatsApp {first}
                        </a>
                        <a
                            href={telLink(SITE.phone)}
                            onClick={() =>
                                track("Contact", {
                                    channel: "call",
                                    location: "team",
                                })
                            }
                            className="btn btn-outline btn-lg"
                        >
                            <PhoneIcon size={20} />
                            <span className="tnum">{SITE.phoneDisplay}</span>
                        </a>
                    </div>

                    {rest.length > 0 && (
                        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t-2 border-ink pt-8 sm:grid-cols-4">
                            {rest.map((a) => {
                                const px = Math.min(200, a.imageW || 200);
                                return (
                                    <li key={a.id}>
                                        {a.image && (
                                            <img
                                                src={cloudinary(
                                                    a.image,
                                                    px * 2,
                                                    px * 2,
                                                    "face",
                                                )}
                                                alt={a.name}
                                                width={px}
                                                height={px}
                                                loading="lazy"
                                                decoding="async"
                                                className="aspect-square w-full max-w-[200px] object-cover"
                                            />
                                        )}
                                        <p className="mt-3 font-display text-[28px] font-extrabold uppercase leading-none text-ink">
                                            {a.name}
                                        </p>
                                        <p className="mt-1 text-[14px] text-slate-500">
                                            {a.role}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
};

/* ---------- Reviews: only genuine, consented ones are ever shown ---------- */
export const Testimonials = () => {
    if (!SITE.testimonials.length) return null;
    return (
        <section className="bg-concrete section" aria-labelledby="rev-h">
            <div className="shell">
                <h2 id="rev-h" data-fx="up" className="display display-lg">
                    What clients say
                </h2>
                <ul className="mt-10 grid gap-6 md:grid-cols-3">
                    {SITE.testimonials.map((t) => (
                        <li
                            key={t.name}
                            className="border-2 border-ink bg-white p-7"
                        >
                            <p className="text-[17px] leading-relaxed text-slate-700">
                                {t.quote}
                            </p>
                            <p className="mt-5 font-semibold text-ink">
                                {t.name}
                            </p>
                            <p className="text-[14px] text-slate-500">
                                {t.role}, {t.area}
                            </p>
                            {t.url && (
                                <a
                                    href={t.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="link-quiet mt-3 inline-block text-[14px] font-semibold text-ink"
                                >
                                    View on Google
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

/* ---------- FAQ (native details: keyboard + screen-reader friendly) ---------- */
export const Faq = () => (
    <section className="section" aria-labelledby="faq-h">
        <div className="shell grid gap-10 lg:grid-cols-12">
            <h2
                id="faq-h"
                data-fx="up"
                className="display display-lg lg:col-span-5"
            >
                Questions people ask us
            </h2>
            <div className="border-t-2 border-ink lg:col-span-7">
                {FAQS.map((f) => (
                    <details
                        key={f.q}
                        className="group border-b-2 border-ink py-5"
                    >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[19px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                            {f.q}
                            <span
                                aria-hidden
                                className="relative h-6 w-6 shrink-0"
                            >
                                <span className="absolute left-0 top-1/2 h-[3px] w-6 -translate-y-1/2 bg-crimson" />
                                <span className="absolute left-1/2 top-0 h-6 w-[3px] -translate-x-1/2 bg-crimson transition-transform duration-200 group-open:scale-y-0" />
                            </span>
                        </summary>
                        <p className="mt-3 max-w-[62ch] text-[17px] leading-relaxed text-slate-600">
                            {f.a}
                        </p>
                    </details>
                ))}
            </div>
        </div>
    </section>
);

/* ---------- Final enquiry ---------- */
export const EnquirySection = () => (
    <section
        id="enquire"
        className="border-t-2 border-ink bg-concrete section"
        aria-labelledby="enq-h"
    >
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
                <h2 id="enq-h" data-fx="up" className="display display-lg">
                    Tell us what you need
                </h2>
                <p className="lede mt-5">
                    Buying, leasing, selling or listing: send a few details and
                    we will call you back with options.
                </p>
                <ul className="mt-8 space-y-3 text-[18px]">
                    <li>
                        <a
                            href={telLink(SITE.phone)}
                            className="inline-flex items-center gap-3 font-semibold text-ink hover:text-crimson"
                        >
                            <PhoneIcon size={20} />
                            <span className="tnum">{SITE.phoneDisplay}</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href={waLink(
                                SITE.whatsapp,
                                "Hi, I'm looking for a property in Ahmedabad.",
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 font-semibold text-ink hover:text-crimson"
                        >
                            <WhatsAppIcon size={20} /> Chat on WhatsApp
                        </a>
                    </li>
                </ul>
                <div className="mt-10 border-t-2 border-ink pt-6">
                    <p className="text-[15px] text-slate-600">
                        New listings and projects are posted on our social
                        pages.
                    </p>
                    <div className="mt-3 flex gap-3">
                        <a
                            href={SITE.social.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline btn-sm"
                        >
                            <InstagramIcon size={18} /> Instagram
                        </a>
                        <a
                            href={SITE.social.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline btn-sm"
                        >
                            <FacebookIcon size={18} /> Facebook
                        </a>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-7">
                <div className="crop">
                    <div className="border-2 border-ink bg-white p-6 sm:p-9">
                        <EnquiryForm id="home-enquiry" />
                    </div>
                </div>
            </div>
        </div>
    </section>
);
