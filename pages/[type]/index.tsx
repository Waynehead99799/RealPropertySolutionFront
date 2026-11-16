import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import { CATEGORIES, CATEGORY_KEYS, CategoryKey } from "src/config/site";
import { Listing, fetchListings } from "src/lib/properties";
import { Seo, breadcrumbSchema } from "@components/seo/Seo";
import { PageHead } from "@components/layout/PageHead";
import { PHOTO_FOR_CATEGORY } from "src/lib/photos";
import { PortfolioIndex } from "@components/property/PortfolioIndex";
import { EnquirySection } from "@components/home/Sections";

interface Props {
    category: CategoryKey;
    listings: Listing[];
}

const CategoryPage: NextPage<Props> = ({ category, listings }) => {
    const c = CATEGORIES[category];
    return (
        <>
            <Seo
                title={`${c.title} | Real Property Solution`}
                description={c.description}
                path={`/${category}`}
                jsonLd={breadcrumbSchema([
                    { name: "Home", path: "/" },
                    { name: c.label, path: `/${category}` },
                ])}
            />
            <PageHead
                title={c.heading}
                blurb={c.blurb}
                crumbs={[{ name: "Home", href: "/" }, { name: c.label }]}
                image={PHOTO_FOR_CATEGORY[category]}
            />
            <section className="shell py-10 sm:py-14">
                <PortfolioIndex listings={listings} fixedCategory={category} />
            </section>
            <EnquirySection />
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: CATEGORY_KEYS.map((type) => ({ params: { type } })),
    fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const category = params?.type as CategoryKey;
    if (!CATEGORY_KEYS.includes(category)) return { notFound: true };
    const all = await fetchListings();
    return {
        props: {
            category,
            listings: all.filter((l) => l.category === category),
        },
        revalidate: 60,
    };
};

export default CategoryPage;
