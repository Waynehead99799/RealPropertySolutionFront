import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import React from "react";
import { SITE } from "src/config/site";
import { waLink } from "src/lib/format";
import { Agent, cloudinary, fetchAgents } from "src/lib/properties";
import { Seo, breadcrumbSchema } from "@components/seo/Seo";
import { PageHead } from "@components/layout/PageHead";
import { EnquirySection } from "@components/home/Sections";
import { CategoryTiles } from "@components/home/CategoryTiles";
import { Reveal } from "@components/ui/Reveal";
import {
    FacebookIcon,
    InstagramIcon,
    WhatsAppIcon,
} from "@components/ui/Icons";

const PRINCIPLES = [
    {
        t: "Prices in the open",
        d: "Every listing shows the price and the price per sq ft, so you can compare before you call.",
    },
    {
        t: "One team, one number",
        d: "You deal with the same consultants from first enquiry to closing. No hand-offs.",
    },
    {
        t: "Straight advice",
        d: "If a property is not right for your use or your budget, we say so.",
    },
];

const About: NextPage<{ agents: Agent[] }> = ({ agents }) => (
    <>
        <Seo
            title="About Real Property Solution | Property Dealers in Ahmedabad"
            description="Real Property Solution is an Ahmedabad property dealership for offices, shops, warehouses, flats, bungalows and plots, based in Thaltej."
            path="/about"
            jsonLd={breadcrumbSchema([
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
            ])}
        />
        <PageHead
            title="About us"
            blurb="We help clients buy, sell and lease offices, shops, warehouses, homes and plots across Ahmedabad."
            crumbs={[{ name: "Home", href: "/" }, { name: "About" }]}
            image="aero-society"
        />

        <section className="section">
            <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-6">
                    <h2 className="display display-md">What we do</h2>
                    <p className="lede mt-5">
                        Real Property Solution is a property dealership with its
                        office at Gala Empire, Thaltej. We handle sales and
                        leasing for commercial space, warehouses, residential
                        homes and plots, and we work with a number of Ahmedabad
                        developers on new projects.
                    </p>
                    <p className="lede mt-4">
                        Our aim is simple: show real prices, answer quickly, and
                        make site visits easy. New listings and projects are
                        posted regularly on our Instagram and Facebook pages.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                        <a
                            href={SITE.social.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                        >
                            <InstagramIcon size={18} /> Instagram
                        </a>
                        <a
                            href={SITE.social.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                        >
                            <FacebookIcon size={18} /> Facebook
                        </a>
                    </div>
                </div>
                <Reveal className="lg:col-span-6">
                    <div className="crop">
                        <img
                            src="/images/team.jpeg"
                            alt="The Real Property Solution team"
                            width={1050}
                            height={747}
                            loading="lazy"
                            decoding="async"
                            className="aspect-[4/3] w-full max-w-[1050px] object-cover"
                        />
                    </div>
                </Reveal>
            </div>
        </section>

        <section className="section" aria-labelledby="svc">
            <div className="shell">
                <h2 id="svc" className="display display-lg max-w-[14ch]">
                    Where we can help
                </h2>
                <div className="mt-12">
                    <CategoryTiles counts={{}} />
                </div>
            </div>
        </section>

        <section className="section" aria-labelledby="how">
            <div className="shell grid gap-12 lg:grid-cols-12">
                <h2 id="how" className="display display-lg lg:col-span-5">
                    How we work
                </h2>
                <dl className="border-t-2 border-ink lg:col-span-7">
                    {PRINCIPLES.map((p) => (
                        <div
                            key={p.t}
                            className="grid gap-2 border-b-2 border-ink py-6 sm:grid-cols-[1fr_1.6fr] sm:gap-8"
                        >
                            <dt className="font-display text-[36px] font-extrabold uppercase leading-none text-ink">
                                {p.t}
                            </dt>
                            <dd className="text-[17px] leading-relaxed text-slate-600">
                                {p.d}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>

        {agents.length > 0 && (
            <section
                className="border-t-2 border-ink bg-concrete section"
                aria-labelledby="team"
            >
                <div className="shell">
                    <h2 id="team" className="display display-lg">
                        Meet the team
                    </h2>
                    <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-5">
                        {agents.map((a) => {
                            const px = Math.min(260, a.imageW || 260);
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
                                            alt={`${
                                                a.name
                                            }, ${a.role.toLowerCase()}`}
                                            width={px}
                                            height={px}
                                            loading="lazy"
                                            decoding="async"
                                            className="aspect-square w-full max-w-[260px] object-cover"
                                        />
                                    )}
                                    <h3 className="mt-4 font-display text-[32px] font-extrabold uppercase leading-none text-ink">
                                        {a.name}
                                    </h3>
                                    <p className="mt-1 text-[14px] text-slate-500">
                                        {a.role}
                                    </p>
                                    {a.phone && (
                                        <a
                                            href={waLink(
                                                `91${a.phone}`,
                                                `Hi ${
                                                    a.name.split(" ")[0]
                                                }, I'm looking for a property in Ahmedabad.`,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-3 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-whatsapp-dark hover:underline"
                                        >
                                            <WhatsAppIcon size={17} /> WhatsApp{" "}
                                            {a.name.split(" ")[0]}
                                        </a>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                    {SITE.rera && (
                        <p className="mt-10 text-[16px] text-slate-600">
                            RERA registration: {SITE.rera}
                        </p>
                    )}
                </div>
            </section>
        )}

        <EnquirySection />
    </>
);

export const getStaticProps: GetStaticProps = async () => ({
    props: { agents: await fetchAgents() },
    revalidate: 300,
});

export default About;
