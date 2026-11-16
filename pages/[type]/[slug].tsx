import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { useEffect } from "react";
import { CATEGORIES, CATEGORY_KEYS, SITE, SITE_URL } from "src/config/site";
import { track } from "src/lib/analytics";
import { formatNumber, telLink, waLink } from "src/lib/format";
import {
    Agent,
    Listing,
    cloudinary,
    fetchAgents,
    fetchListings,
} from "src/lib/properties";
import { Seo, breadcrumbSchema } from "@components/seo/Seo";
import { Breadcrumbs } from "@components/layout/PageHead";
import { Gallery } from "@components/property/Gallery";
import { EmiCalculator } from "@components/property/EmiCalculator";
import {
    PropertyCard,
    Price,
    SaveButton,
    Tags,
} from "@components/property/PropertyCard";
import { EnquiryForm } from "@components/forms/EnquiryForm";
import {
    CheckIcon,
    PhoneIcon,
    PinIcon,
    ShareIcon,
    WhatsAppIcon,
} from "@components/ui/Icons";

interface Props {
    listing: Listing;
    related: Listing[];
    lead: Agent | null;
}

const QUESTIONS = [
    "Is it still available?",
    "What is the best price?",
    "Can I visit this week?",
    "Please share more photos",
];

const Fact = ({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) => (
    <div className="border-b-2 border-r-2 border-ink p-4 sm:p-5">
        <dt className="text-[14px] text-slate-500">{label}</dt>
        <dd className="mt-1 font-display text-[28px] font-extrabold uppercase leading-[1.05] text-ink">
            {children}
        </dd>
    </div>
);

const ListingPage: NextPage<Props> = ({ listing: l, related, lead }) => {
    const url = `${SITE_URL}${l.path}`;
    const cat = CATEGORIES[l.category];
    const where = l.areaName || l.locality.split(",")[0] || "Ahmedabad";
    const waText = `Hi, I'm interested in ${l.name} (${l.ref})${
        l.locality ? `, ${l.locality}` : ""
    }, ${l.dealLabel.toLowerCase()}, ${l.priceLabel}${
        l.priceSuffix ? ` ${l.priceSuffix}` : ""
    }. ${url}`;

    useEffect(() => {
        track("ViewContent", {
            content_ids: [l.id],
            content_type: "property",
            content_category: l.category,
            value: l.price,
            currency: "INR",
        });
    }, [l.id, l.category, l.price]);

    const share = async () => {
        const data = {
            title: `${l.name}, ${l.kind} ${
                l.deal === "rent" ? "for rent" : "for sale"
            }`,
            url,
        };
        if (navigator.share) {
            try {
                await navigator.share(data);
                return;
            } catch {
                /* cancelled */
            }
        }
        window.open(
            `https://wa.me/?text=${encodeURIComponent(
                `${data.title}: ${url}`,
            )}`,
            "_blank",
            "noopener",
        );
    };

    const jsonLd = [
        breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: cat.label, path: `/${l.category}` },
            { name: l.name, path: l.path },
        ]),
        {
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            name: `${l.name}, ${l.kind} ${
                l.deal === "rent" ? "for rent" : "for sale"
            } in ${where}`,
            url,
            description: l.summary,
            datePosted: l.createdAt ? l.createdAt.slice(0, 10) : undefined,
            image: l.images.slice(0, 5).map((i) => cloudinary(i, 1200)),
            offers: {
                "@type": "Offer",
                price: l.price,
                priceCurrency: "INR",
                availability: "https://schema.org/InStock",
                url,
                seller: { "@id": `${SITE_URL}/#agent` },
            },
            about: {
                "@type": "Place",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: l.address,
                    addressLocality: "Ahmedabad",
                    addressRegion: "Gujarat",
                    postalCode: l.pincode,
                    addressCountry: "IN",
                },
            },
        },
    ];

    return (
        <>
            <Seo
                title={l.seoTitle}
                brand={false}
                description={l.seoDescription}
                path={l.path}
                image={
                    l.cover
                        ? cloudinary(l.cover, 1200).replace("f_auto", "f_jpg")
                        : undefined
                }
                jsonLd={jsonLd}
            />

            <div className="shell pb-16 pt-8">
                <Breadcrumbs
                    crumbs={[
                        { name: "Home", href: "/" },
                        { name: cat.label, href: `/${l.category}` },
                        { name: l.name },
                    ]}
                />

                {/* Title plate */}
                <header className="mt-6 grid gap-6 border-b-2 border-ink pb-8 lg:grid-cols-12 lg:items-end">
                    <div className="lg:col-span-8">
                        <div className="flex flex-wrap items-center gap-3">
                            <Tags l={l} />
                            <span className="tnum text-[15px] font-semibold text-slate-500">
                                {l.ref} · {l.kind}
                            </span>
                        </div>
                        <h1 className="display display-lg mt-4">
                            <span className="line">
                                <span>{l.name}</span>
                            </span>
                        </h1>
                        <p className="mt-3 flex items-start gap-2 text-[18px] text-slate-600">
                            <PinIcon
                                size={20}
                                className="mt-1 shrink-0 text-crimson"
                            />
                            <span>
                                {l.kind}{" "}
                                {l.deal === "rent" ? "for rent" : "for sale"} in{" "}
                                {where}, Ahmedabad
                                {l.locality && l.locality !== where
                                    ? `. ${l.locality}.`
                                    : ""}
                            </span>
                        </p>
                    </div>
                    <div className="lg:col-span-4 lg:text-right">
                        <Price
                            l={l}
                            className="text-[clamp(3.4rem,7vw,5.6rem)]"
                        />
                        {l.perSqft && (
                            <p className="tnum mt-2 text-[16px] font-medium text-slate-500">
                                {l.perSqft}
                            </p>
                        )}
                        <div className="mt-4 flex gap-2 lg:justify-end">
                            <SaveButton l={l} className="border-2 border-ink" />
                            <button
                                type="button"
                                onClick={share}
                                aria-label="Share this listing"
                                className="inline-flex h-11 items-center gap-2 border-2 border-ink px-4 font-display text-[19px] font-extrabold uppercase tracking-[0.05em] text-ink transition-colors hover:bg-ink hover:text-white"
                            >
                                <ShareIcon size={17} /> Share
                            </button>
                        </div>
                    </div>
                </header>

                <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-14">
                    {/* ---------- Main column ---------- */}
                    <div className="min-w-0">
                        <Gallery
                            images={l.images}
                            widths={l.imageWidths}
                            category={l.category}
                            alt={`${l.name}, ${l.kind.toLowerCase()} ${
                                l.deal === "rent" ? "for rent" : "for sale"
                            }${l.locality ? ` in ${l.locality}` : ""}`}
                        />

                        <section aria-labelledby="facts-h" className="mt-14">
                            <h2 id="facts-h" className="display display-md">
                                Key facts
                            </h2>
                            <dl className="mt-5 grid grid-cols-2 border-l-2 border-t-2 border-ink md:grid-cols-3">
                                <Fact label="Property type">{l.kind}</Fact>
                                <Fact label="Available for">
                                    {l.deal === "rent"
                                        ? "Rent or lease"
                                        : "Sale"}
                                </Fact>
                                {l.sqft && (
                                    <Fact
                                        label={
                                            l.category === "land"
                                                ? "Plot area"
                                                : "Area"
                                        }
                                    >
                                        <span className="tnum">
                                            {formatNumber(l.sqft)} sq ft
                                        </span>
                                    </Fact>
                                )}
                                {l.perSqft && (
                                    <Fact label="Rate">
                                        <span className="tnum">
                                            {l.perSqft
                                                .replace(" / sq ft / month", "")
                                                .replace(" / sq ft", "")}
                                            <span className="font-sans text-[14px] font-semibold normal-case text-slate-500">
                                                {" "}
                                                per sq ft
                                                {l.deal === "rent"
                                                    ? " / month"
                                                    : ""}
                                            </span>
                                        </span>
                                    </Fact>
                                )}
                                {l.furnishing && (
                                    <Fact label="Furnishing">
                                        {l.furnishing}
                                    </Fact>
                                )}
                                {l.preLeased && (
                                    <Fact label="Lease status">Pre-leased</Fact>
                                )}
                                {l.beds && (
                                    <Fact label="Bedrooms">{l.beds}</Fact>
                                )}
                                {l.baths && (
                                    <Fact label="Bathrooms">{l.baths}</Fact>
                                )}
                                {l.floors && (
                                    <Fact label="Floors">{l.floors}</Fact>
                                )}
                                {l.pincode && (
                                    <Fact label="PIN code">
                                        <span className="tnum">
                                            {l.pincode}
                                        </span>
                                    </Fact>
                                )}
                            </dl>
                        </section>

                        <section aria-labelledby="about-h" className="mt-14">
                            <h2 id="about-h" className="display display-md">
                                About this property
                            </h2>
                            <p className="mt-5 max-w-prose text-[18px] leading-[1.75] text-slate-700">
                                {l.summary}
                            </p>
                            {l.note && (
                                <p className="mt-3 max-w-prose text-[16px] leading-relaxed text-slate-500">
                                    Listing note: {l.note}
                                </p>
                            )}
                            {l.preLeased && (
                                <div className="mt-6 border-2 border-ink bg-concrete-50 p-5">
                                    <h3 className="text-[18px]">
                                        Buying a pre-leased property
                                    </h3>
                                    <p className="mt-1.5 text-[16px] leading-relaxed text-slate-600">
                                        A pre-leased property is sold with a
                                        tenant already in place, so rent starts
                                        from day one. Ask us for the tenant
                                        type, lease term and current rent to
                                        work out the yield.
                                    </p>
                                </div>
                            )}
                        </section>

                        {l.amenities.length > 0 && (
                            <section aria-labelledby="am-h" className="mt-14">
                                <h2 id="am-h" className="display display-md">
                                    Amenities
                                </h2>
                                <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                                    {l.amenities.map((a) => (
                                        <li
                                            key={a}
                                            className="flex items-center gap-3 text-[17px] font-medium text-ink"
                                        >
                                            <span className="flex h-6 w-6 items-center justify-center bg-crimson text-white">
                                                <CheckIcon
                                                    size={14}
                                                    strokeWidth={3}
                                                />
                                            </span>
                                            {a}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {l.deal === "sale" && l.price > 0 && (
                            <section aria-labelledby="emi-h" className="mt-14">
                                <h2 id="emi-h" className="display display-md">
                                    EMI estimator
                                </h2>
                                <div className="mt-5">
                                    <EmiCalculator price={l.price} />
                                </div>
                            </section>
                        )}

                        <section aria-labelledby="loc-h" className="mt-14">
                            <h2 id="loc-h" className="display display-md">
                                Location
                            </h2>
                            <p className="mt-4 text-[17px] text-slate-600">
                                {l.address}
                            </p>
                            <div className="crop mt-5">
                                <iframe
                                    title={`Map showing ${l.name}`}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                                        `${l.name}, ${l.address}`,
                                    )}&output=embed`}
                                    className="block h-[340px] w-full border-2 border-ink"
                                />
                            </div>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                    `${l.name}, ${l.address}`,
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline mt-5"
                            >
                                <PinIcon size={18} /> Open in Google Maps
                            </a>
                        </section>
                    </div>

                    {/* ---------- Sticky enquiry ---------- */}
                    <aside
                        id="enquire"
                        className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start"
                    >
                        <div className="border-2 border-ink bg-white shadow-lift">
                            <div className="bg-crimson px-6 py-3 text-white">
                                <p className="font-display text-[30px] font-extrabold uppercase leading-none">
                                    Interested? Ask us
                                </p>
                            </div>
                            <div className="p-6">
                                {lead && (
                                    <div className="mb-5 flex items-center gap-4 border-b-2 border-concrete-200 pb-5">
                                        {lead.image && (
                                            <img
                                                src={cloudinary(
                                                    lead.image,
                                                    240,
                                                    240,
                                                    "face",
                                                )}
                                                alt={lead.name}
                                                width={60}
                                                height={60}
                                                className="h-[60px] w-[60px] object-cover"
                                            />
                                        )}
                                        <div>
                                            <p className="text-[17px] font-semibold text-ink">
                                                {lead.name}
                                            </p>
                                            <p className="text-[14px] text-slate-500">
                                                {lead.role}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <ul className="grid grid-cols-2 gap-2">
                                    {QUESTIONS.map((q) => (
                                        <li key={q}>
                                            <a
                                                href={waLink(
                                                    SITE.whatsapp,
                                                    `${l.name} (${l.ref}): ${q} ${url}`,
                                                )}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() =>
                                                    track("Contact", {
                                                        channel: "whatsapp",
                                                        content_ids: [l.id],
                                                        location:
                                                            "quick-question",
                                                    })
                                                }
                                                className="flex h-full min-h-[56px] items-center border-2 border-concrete-300 px-3 text-[14px] font-semibold leading-tight text-ink transition-colors hover:border-ink hover:bg-concrete-50"
                                            >
                                                {q}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-3 grid grid-cols-2 gap-2">
                                    <a
                                        href={telLink(SITE.phone)}
                                        onClick={() =>
                                            track("Contact", {
                                                channel: "call",
                                                content_ids: [l.id],
                                                location: "listing",
                                            })
                                        }
                                        className="btn btn-outline"
                                    >
                                        <PhoneIcon size={18} /> Call
                                    </a>
                                    <a
                                        href={waLink(SITE.whatsapp, waText)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() =>
                                            track("Contact", {
                                                channel: "whatsapp",
                                                content_ids: [l.id],
                                                location: "listing",
                                            })
                                        }
                                        className="btn btn-whatsapp"
                                    >
                                        <WhatsAppIcon size={20} /> Chat
                                    </a>
                                </div>
                                <div className="my-6 flex items-center gap-3 text-[14px] text-slate-500">
                                    <span className="h-[2px] flex-1 bg-concrete-200" />
                                    or request a call back
                                    <span className="h-[2px] flex-1 bg-concrete-200" />
                                </div>
                                <EnquiryForm
                                    id="listing-enquiry"
                                    compact
                                    listing={{
                                        id: l.id,
                                        ref: l.ref,
                                        name: l.name,
                                        path: l.path,
                                        category: l.category,
                                        deal: l.deal,
                                        price: l.price,
                                    }}
                                />
                            </div>
                        </div>
                    </aside>
                </div>

                {related.length > 0 && (
                    <section
                        aria-labelledby="rel-h"
                        className="mt-24 border-t-2 border-ink pt-14"
                    >
                        <h2 id="rel-h" className="display display-lg">
                            More from the portfolio
                        </h2>
                        <div className="mt-10 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((r) => (
                                <PropertyCard key={r.id} listing={r} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: [],
    fallback: "blocking",
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const type = String(params?.type || "");
    const slug = String(params?.slug || "");
    if (!CATEGORY_KEYS.includes(type as never)) return { notFound: true };

    const [all, agents] = await Promise.all([fetchListings(), fetchAgents()]);
    const listing = all.find((l) => l.slug === slug);
    if (!listing) return { notFound: true, revalidate: 30 };
    // Right slug, wrong category folder (e.g. a plot filed under /residential): permanent redirect.
    if (listing.category !== type)
        return { redirect: { destination: listing.path, permanent: true } };

    const others = all.filter((l) => l.id !== listing.id);
    const related = [
        ...others.filter((l) => l.category === listing.category),
        ...others.filter((l) => l.category !== listing.category),
    ].slice(0, 3);
    const lead =
        agents.find((a) => a.role.startsWith("Lead")) || agents[0] || null;

    return {
        props: {
            listing,
            related,
            lead,
            layout: {
                waMessage: `Hi, I'm interested in ${listing.name} (${
                    listing.ref
                }), ${listing.dealLabel.toLowerCase()}. ${SITE_URL}${
                    listing.path
                }`,
                askContext: `${listing.name} (${listing.ref})`,
                enquireHref: "#enquire",
            },
        },
        revalidate: 60,
    };
};

export default ListingPage;
