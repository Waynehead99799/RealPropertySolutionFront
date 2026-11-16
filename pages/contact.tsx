import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { MAPS_DIRECTIONS_URL, MAPS_EMBED_URL, SITE } from "src/config/site";
import { track } from "src/lib/analytics";
import { telLink, waLink } from "src/lib/format";
import { Seo, breadcrumbSchema } from "@components/seo/Seo";
import { PageHead } from "@components/layout/PageHead";
import { EnquiryForm } from "@components/forms/EnquiryForm";
import {
    ClockIcon,
    FacebookIcon,
    InstagramIcon,
    MailIcon,
    PhoneIcon,
    PinIcon,
    WhatsAppIcon,
} from "@components/ui/Icons";

const Row = ({
    icon,
    label,
    children,
}: {
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
}) => (
    <div className="flex gap-4 border-b-2 border-ink py-5 last:border-b-0">
        <span className="mt-1 text-crimson">{icon}</span>
        <div>
            <p className="text-[14px] font-semibold text-slate-500">{label}</p>
            <div className="mt-1 font-display text-[30px] font-extrabold uppercase leading-[1.05] text-ink">
                {children}
            </div>
        </div>
    </div>
);

const Contact: NextPage = () => {
    const { query } = useRouter();
    const listing = query.intent === "list";
    return (
        <>
            <Seo
                title="Contact Real Property Solution | Property Dealer in Thaltej, Ahmedabad"
                description="Visit, call or WhatsApp Real Property Solution at Gala Empire, Thaltej, Ahmedabad, or request a call back about buying, leasing or listing a property."
                path="/contact"
                jsonLd={breadcrumbSchema([
                    { name: "Home", path: "/" },
                    { name: "Contact", path: "/contact" },
                ])}
            />
            <PageHead
                title={listing ? "List your property" : "Contact us"}
                blurb={
                    listing
                        ? "Send the location, size and expected price or rent, and we will get in touch to list it."
                        : "Call, WhatsApp, visit our Thaltej office, or send an enquiry and we will call you back."
                }
                crumbs={[{ name: "Home", href: "/" }, { name: "Contact" }]}
                image="aero-sabarmati"
            />

            <section
                id="enquire"
                className="shell grid gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-16"
            >
                <div className="lg:col-span-5">
                    <div className="border-2 border-ink px-6">
                        <Row icon={<PhoneIcon size={22} />} label="Call us">
                            <a
                                href={telLink(SITE.phone)}
                                onClick={() =>
                                    track("Contact", {
                                        channel: "call",
                                        location: "contact-page",
                                    })
                                }
                                className="tnum hover:text-crimson"
                            >
                                {SITE.phoneDisplay}
                            </a>
                        </Row>
                        <Row icon={<WhatsAppIcon size={22} />} label="WhatsApp">
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
                                        location: "contact-page",
                                    })
                                }
                                className="hover:text-crimson"
                            >
                                Chat now
                            </a>
                        </Row>
                        <Row icon={<MailIcon size={22} />} label="Email">
                            <a
                                href={`mailto:${SITE.email}`}
                                className="break-all font-sans text-[18px] font-semibold normal-case hover:text-crimson"
                            >
                                {SITE.email}
                            </a>
                        </Row>
                        <Row icon={<PinIcon size={22} />} label="Office">
                            <address className="font-sans text-[18px] font-semibold normal-case not-italic leading-snug">
                                {SITE.address.line1},
                                <br />
                                {SITE.address.line2},
                                <br />
                                {SITE.address.city}, {SITE.address.region}{" "}
                                {SITE.address.postalCode}
                            </address>
                        </Row>
                        {SITE.hours && (
                            <Row
                                icon={<ClockIcon size={22} />}
                                label="Office hours"
                            >
                                <span className="font-sans text-[18px] font-semibold normal-case">
                                    {SITE.hours}
                                </span>
                            </Row>
                        )}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <a
                            href={MAPS_DIRECTIONS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-dark"
                        >
                            <PinIcon size={18} /> Get directions
                        </a>
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

                <div className="lg:col-span-7">
                    <div className="crop">
                        <div className="border-2 border-ink bg-white p-6 shadow-lift sm:p-9">
                            <EnquiryForm
                                id="contact-enquiry"
                                heading={
                                    listing
                                        ? "List your property"
                                        : "Send an enquiry"
                                }
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section aria-label="Map" className="shell pb-20">
                <iframe
                    title="Map showing the Real Property Solution office in Thaltej, Ahmedabad"
                    src={MAPS_EMBED_URL}
                    loading="lazy"
                    className="block h-[380px] w-full border-2 border-ink"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </section>
        </>
    );
};

export default Contact;
