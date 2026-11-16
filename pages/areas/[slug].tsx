import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import React from "react";
import { AREAS, SITE } from "src/config/site";
import { waLink } from "src/lib/format";
import { Listing, fetchListings } from "src/lib/properties";
import { Seo, breadcrumbSchema } from "@components/seo/Seo";
import { PageHead } from "@components/layout/PageHead";
import { PHOTO_FOR_AREA } from "src/lib/photos";
import { PropertyCard } from "@components/property/PropertyCard";
import { EmptyState } from "@components/property/PortfolioIndex";
import { EnquirySection } from "@components/home/Sections";
import { WhatsAppIcon } from "@components/ui/Icons";

interface Props {
    slug: string;
    listings: Listing[];
}

const AreaPage: NextPage<Props> = ({ slug, listings }) => {
    const area = AREAS.find((a) => a.slug === slug)!;
    const others = AREAS.filter((a) => a.slug !== slug);
    return (
        <>
            <Seo
                title={`Property in ${area.name}, Ahmedabad | Real Property Solution`}
                description={`${area.intro} Offices, shops, warehouses, flats and plots around ${area.name} with real prices from Real Property Solution.`}
                path={`/areas/${slug}`}
                jsonLd={breadcrumbSchema([
                    { name: "Home", path: "/" },
                    { name: "Areas", path: "/properties" },
                    { name: area.name, path: `/areas/${slug}` },
                ])}
            />
            <PageHead
                title={area.name}
                blurb={area.intro}
                crumbs={[
                    { name: "Home", href: "/" },
                    { name: "Areas", href: "/properties" },
                    { name: area.name },
                ]}
                image={PHOTO_FOR_AREA[slug] || "aero-sabarmati"}
            />

            <section className="shell grid gap-12 py-14 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-7">
                    <h2 className="display display-md">About {area.name}</h2>
                    <p className="mt-5 max-w-prose text-[18px] leading-[1.75] text-slate-700">
                        {area.detail}
                    </p>
                    <a
                        href={waLink(
                            SITE.whatsapp,
                            `Hi, I'm looking for a property around ${area.name}, Ahmedabad.`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp btn-lg mt-7"
                    >
                        <WhatsAppIcon size={22} /> Ask about {area.name}
                    </a>
                </div>
                <div className="lg:col-span-5">
                    <h2 className="font-display text-[30px] font-extrabold uppercase">
                        Other areas we cover
                    </h2>
                    <ul className="mt-4 border-t-2 border-ink">
                        {others.map((a) => (
                            <li key={a.slug} className="border-b-2 border-ink">
                                <Link href={`/areas/${a.slug}`}>
                                    <a className="block py-3 font-display text-[28px] font-extrabold uppercase leading-none text-ink transition-colors hover:text-crimson">
                                        {a.name}
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="border-t-2 border-ink bg-concrete section">
                <div className="shell">
                    <h2 className="display display-lg">
                        Available near {area.name}
                    </h2>
                    {listings.length ? (
                        <div className="mt-10 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                            {listings.map((l) => (
                                <PropertyCard key={l.id} listing={l} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title={`No listings in ${area.name} right now`}
                        />
                    )}
                </div>
            </section>
            <EnquirySection />
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: AREAS.map((a) => ({ params: { slug: a.slug } })),
    fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const slug = String(params?.slug || "");
    if (!AREAS.some((a) => a.slug === slug)) return { notFound: true };
    const all = await fetchListings();
    return {
        props: { slug, listings: all.filter((l) => l.areaKey === slug) },
        revalidate: 60,
    };
};

export default AreaPage;
