import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import React from "react";
import { LANDING_PAGES, SITE } from "src/config/site";
import { track } from "src/lib/analytics";
import { telLink, waLink } from "src/lib/format";
import { Listing, fetchListings } from "src/lib/properties";
import { Seo } from "@components/seo/Seo";
import { EnquiryForm } from "@components/forms/EnquiryForm";
import { PropertyCard } from "@components/property/PropertyCard";
import { Photo } from "@components/ui/Photo";
import { PHOTO_FOR_CATEGORY } from "src/lib/photos";
import { CheckIcon, PhoneIcon, WhatsAppIcon } from "@components/ui/Icons";

interface Props {
    slug: string;
    listings: Listing[];
}

const Landing: NextPage<Props> = ({ slug, listings }) => {
    const lp = LANDING_PAGES[slug];
    return (
        <>
            <Seo
                title={lp.title}
                description={lp.description}
                path={`/lp/${slug}`}
                noindex
            />

            {/* Slim header: no site navigation, so the only exits are the conversion actions */}
            <header className="border-b-2 border-ink bg-white">
                <div className="shell flex h-[72px] items-center justify-between">
                    <Link href="/">
                        <a aria-label={`${SITE.name}, home`}>
                            <img
                                src="/logo.png"
                                alt={SITE.name}
                                width={137}
                                height={44}
                                className="h-[44px] w-auto"
                            />
                        </a>
                    </Link>
                    <a
                        href={telLink(SITE.phone)}
                        onClick={() =>
                            track("Contact", {
                                channel: "call",
                                location: "lp-header",
                            })
                        }
                        className="btn btn-outline btn-sm"
                    >
                        <PhoneIcon size={17} />{" "}
                        <span className="tnum">{SITE.phoneDisplay}</span>
                    </a>
                </div>
            </header>

            <section className="relative isolate overflow-hidden bg-crimson text-white">
                {/* the kind of place this page is about, under a crimson wash so the copy stays easy to read */}
                <Photo
                    name={PHOTO_FOR_CATEGORY[lp.match.category || "commercial"]}
                    priority
                    sizes="100vw"
                    className="absolute inset-0 -z-10 h-full w-full object-cover grayscale"
                />
                <div
                    aria-hidden
                    className="absolute inset-0 -z-10"
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(180,19,30,0.94) 0%, rgba(180,19,30,0.86) 55%, rgba(180,19,30,0.7) 100%)",
                    }}
                />
                <div className="shell grid gap-10 py-12 lg:grid-cols-12 lg:items-start lg:gap-14 lg:py-20">
                    <div className="lg:col-span-7">
                        <h1 className="display display-lg !text-white">
                            <span className="line">
                                <span>{lp.headline}</span>
                            </span>
                        </h1>
                        <p className="mt-5 max-w-[52ch] text-[19px] leading-relaxed text-white/90">
                            {lp.sub}
                        </p>
                        <ul className="mt-6 space-y-3">
                            {lp.points.map((p) => (
                                <li
                                    key={p}
                                    className="flex items-center gap-3 text-[18px] text-white"
                                >
                                    <span className="flex h-6 w-6 items-center justify-center bg-white text-crimson">
                                        <CheckIcon size={14} strokeWidth={3} />
                                    </span>
                                    {p}
                                </li>
                            ))}
                        </ul>
                        <a
                            href={waLink(SITE.whatsapp, lp.wa)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                                track("Contact", {
                                    channel: "whatsapp",
                                    location: "lp-hero",
                                })
                            }
                            className="btn btn-white btn-lg mt-8"
                        >
                            <WhatsAppIcon size={22} /> WhatsApp us now
                        </a>
                    </div>
                    <div
                        id="enquire"
                        className="border-2 border-ink bg-white p-6 text-slate-700 shadow-lift sm:p-8 lg:col-span-5"
                    >
                        <EnquiryForm
                            id="lp-enquiry"
                            compact
                            heading="Get matching options"
                        />
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="shell">
                    <h2 className="display display-lg">Available now</h2>
                    {listings.length ? (
                        <div className="mt-10 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                            {listings.map((l) => (
                                <PropertyCard key={l.id} listing={l} />
                            ))}
                        </div>
                    ) : (
                        <p className="mt-6 max-w-[52ch] text-[18px] text-slate-600">
                            Matching options change often. Send your requirement
                            above and we will share what is available today.
                        </p>
                    )}
                </div>
            </section>

            <footer className="border-t-2 border-ink py-8 pb-28 text-center text-[14px] text-slate-500 lg:pb-8">
                © {new Date().getFullYear()} {SITE.name}. {SITE.address.line2},{" "}
                {SITE.address.city}.{" "}
                <Link href="/privacy-policy">
                    <a className="link-quiet">Privacy policy</a>
                </Link>
            </footer>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: Object.keys(LANDING_PAGES).map((slug) => ({ params: { slug } })),
    fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const slug = String(params?.slug || "");
    const lp = LANDING_PAGES[slug];
    if (!lp) return { notFound: true };

    const all = await fetchListings();
    const { areaKey, category, preLeased } = lp.match;
    const matches = all.filter(
        (l) =>
            (!areaKey || l.areaKey === areaKey) &&
            (!category || l.category === category) &&
            (!preLeased || l.preLeased),
    );
    // Warehouses may have no live listings yet; commercial is the sensible fallback elsewhere.
    const pool = matches.length
        ? matches
        : category === "warehouse"
        ? []
        : all.filter((l) => l.category === (category || "commercial"));
    return {
        props: {
            slug,
            listings: pool.slice(0, 6),
            layout: {
                waMessage: lp.wa,
                enquireHref: "#enquire",
                minimal: true,
            },
        },
        revalidate: 60,
    };
};

export default Landing;
