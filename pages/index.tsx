import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { FAQS, SITE } from "src/config/site";
import {
    Agent,
    Listing,
    areasInUse,
    fetchAgents,
    fetchListings,
} from "src/lib/properties";
import { Seo, faqSchema } from "@components/seo/Seo";
import { HERO_PHOTO, Hero } from "@components/home/Hero";
import {
    AreasWall,
    GlanceBand,
    Panorama,
    Categories,
    EnquirySection,
    Faq,
    Portfolio,
    Process,
    Ribbon,
    Statement,
    Team,
    Testimonials,
} from "@components/home/Sections";

interface HomeProps {
    listings: Listing[];
    agents: Agent[];
}

const Home: NextPage<HomeProps> = ({ listings, agents }) => (
    <>
        <Seo
            title="Property Dealer in Ahmedabad | Real Property Solution"
            description={SITE.description}
            path="/"
            image={`${SITE.url}/photos/og-home.jpg`}
            jsonLd={faqSchema(FAQS)}
        />
        <Head>
            <link
                rel="preload"
                as="image"
                href={HERO_PHOTO.preload}
                {...({ fetchpriority: "high" } as Record<string, string>)}
            />
        </Head>
        <Hero
            latest={listings.find((l) => l.cover) || null}
            areaOptions={areasInUse(listings).map((a) => ({
                slug: a.slug,
                name: a.name,
            }))}
        />
        <Ribbon />
        <Statement />
        <Panorama />
        <Portfolio listings={listings} />
        <GlanceBand listings={listings} agents={agents} />
        <Categories listings={listings} />
        <AreasWall listings={listings} />
        <Process />
        <Team agents={agents} />
        <Testimonials />
        <Faq />
        <EnquirySection />
    </>
);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const [listings, agents] = await Promise.all([
        fetchListings(),
        fetchAgents(),
    ]);
    return { props: { listings, agents }, revalidate: 60 };
};

export default Home;
