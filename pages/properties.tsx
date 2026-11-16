import type { GetStaticProps, NextPage } from "next";
import React from "react";
import { Listing, fetchListings } from "src/lib/properties";
import { Seo, breadcrumbSchema } from "@components/seo/Seo";
import { PageHead } from "@components/layout/PageHead";
import { PortfolioIndex } from "@components/property/PortfolioIndex";
import { EnquirySection } from "@components/home/Sections";

const Properties: NextPage<{ listings: Listing[] }> = ({ listings }) => (
    <>
        <Seo
            title="Properties for Sale and Rent in Ahmedabad | Real Property Solution"
            description="Browse offices, shops, warehouses, flats and plots for sale and rent in Ahmedabad. Real prices, price per sq ft and photos from Real Property Solution."
            path="/properties"
            jsonLd={breadcrumbSchema([
                { name: "Home", path: "/" },
                { name: "Properties", path: "/properties" },
            ])}
        />
        <PageHead
            title="Portfolio"
            blurb="Offices, shops, warehouses, homes and plots across Ahmedabad, each with its price and price per sq ft."
            crumbs={[{ name: "Home", href: "/" }, { name: "Properties" }]}
            image="aero-sabarmati"
        />
        <section className="shell py-10 sm:py-14">
            <PortfolioIndex listings={listings} />
        </section>
        <EnquirySection />
    </>
);

export const getStaticProps: GetStaticProps = async () => ({
    props: { listings: await fetchListings() },
    revalidate: 60,
});

export default Properties;
