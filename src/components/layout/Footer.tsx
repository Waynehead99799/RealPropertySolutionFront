import Link from "next/link";
import React from "react";
import { AREAS, MAPS_DIRECTIONS_URL, NAV, SITE } from "src/config/site";
import { telLink, waLink } from "src/lib/format";
import { track } from "src/lib/analytics";
import { Marquee } from "src/components/ui/Marquee";
import {
    FacebookIcon,
    InstagramIcon,
    MailIcon,
    PhoneIcon,
    PinIcon,
    WhatsAppIcon,
} from "src/components/ui/Icons";

const ColHead = ({ children }: { children: React.ReactNode }) => (
    <h2 className="mb-4 font-display text-[22px] font-extrabold uppercase tracking-[0.06em] text-white">
        {children}
    </h2>
);

const FooterLink = ({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) => (
    <Link href={href}>
        <a className="inline-block py-1.5 text-[16px] text-white/70 transition-colors hover:text-white">
            {children}
        </a>
    </Link>
);

export const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer>
            {/* The call board: a crimson hoarding with the number big enough to read from the road */}
            <section
                aria-labelledby="board-h"
                className="bg-crimson text-white"
            >
                <div className="shell py-16 md:py-24">
                    <h2 id="board-h" className="display display-lg !text-white">
                        To let? For sale?
                        <br />
                        Call us.
                    </h2>
                    <a
                        href={telLink(SITE.phone)}
                        onClick={() =>
                            track("Contact", {
                                channel: "call",
                                location: "footer-board",
                            })
                        }
                        className="tnum mt-6 block font-display text-[clamp(3.4rem,13vw,12rem)] font-black leading-[0.9] tracking-[0.01em] text-white hover:text-ink"
                    >
                        {SITE.phoneDisplay.replace("+91 ", "")}
                    </a>
                    <div className="mt-8 flex flex-wrap gap-3">
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
                                    location: "footer-board",
                                })
                            }
                            className="btn btn-white btn-lg"
                        >
                            <WhatsAppIcon size={22} /> WhatsApp us
                        </a>
                        <Link href="/contact">
                            <a className="btn btn-dark btn-lg">
                                Send an enquiry
                            </a>
                        </Link>
                    </div>
                </div>
                <Marquee
                    items={[
                        "Offices",
                        "Shops",
                        "Showrooms",
                        "Warehouses",
                        "Flats",
                        "Bungalows",
                        "Plots",
                        "New projects",
                    ]}
                    className="bg-ink py-3"
                    itemClassName="font-display text-[26px] font-extrabold uppercase tracking-[0.06em] text-white/90"
                    dotClassName="bg-crimson"
                />
            </section>

            <div className="bg-ink pb-[96px] pt-16 text-white/70 lg:pb-0">
                <div className="shell">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.3fr_0.9fr_1fr_1.3fr] lg:gap-12">
                        <div className="col-span-2 lg:col-span-1">
                            <img
                                src="/logo.png"
                                alt={SITE.name}
                                width={160}
                                height={51}
                                loading="lazy"
                                className="h-[51px] w-auto brightness-0 invert"
                            />
                            <p className="mt-5 max-w-[34ch] text-[16px] leading-relaxed text-white/70">
                                Ahmedabad property dealers for offices, shops,
                                warehouses, flats, bungalows and plots.
                            </p>
                            <div className="mt-6 flex items-center gap-3">
                                {[
                                    {
                                        href: SITE.social.instagram,
                                        label: "Real Property Solution on Instagram",
                                        icon: <InstagramIcon size={20} />,
                                    },
                                    {
                                        href: SITE.social.facebook,
                                        label: "Real Property Solution on Facebook",
                                        icon: <FacebookIcon size={20} />,
                                    },
                                    {
                                        href: waLink(SITE.whatsapp),
                                        label: "Chat with Real Property Solution on WhatsApp",
                                        icon: <WhatsAppIcon size={20} />,
                                    },
                                ].map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.label}
                                        className="inline-flex h-11 w-11 items-center justify-center border-2 border-white/30 text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <nav aria-label="Explore">
                            <ColHead>Explore</ColHead>
                            <ul>
                                <li>
                                    <FooterLink href="/properties">
                                        All properties
                                    </FooterLink>
                                </li>
                                {NAV.slice(0, 4).map((l) => (
                                    <li key={l.href}>
                                        <FooterLink href={l.href}>
                                            {l.label}
                                        </FooterLink>
                                    </li>
                                ))}
                                <li>
                                    <FooterLink href="/contact?intent=list">
                                        List your property
                                    </FooterLink>
                                </li>
                            </ul>
                            <div className="mt-8">
                                <ColHead>Company</ColHead>
                                <ul>
                                    {[
                                        ["About us", "/about"],
                                        ["Contact", "/contact"],
                                        ["Terms and conditions", "/terms"],
                                        ["Privacy policy", "/privacy-policy"],
                                        ["Photo credits", "/photo-credits"],
                                    ].map(([l, h]) => (
                                        <li key={h}>
                                            <FooterLink href={h}>
                                                {l}
                                            </FooterLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </nav>

                        <nav aria-label="Areas we cover">
                            <ColHead>Areas we cover</ColHead>
                            <ul>
                                {AREAS.map((a) => (
                                    <li key={a.slug}>
                                        <FooterLink href={`/areas/${a.slug}`}>
                                            {a.name}
                                        </FooterLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className="col-span-2 lg:col-span-1">
                            <ColHead>Visit or call</ColHead>
                            <address className="not-italic">
                                <a
                                    href={MAPS_DIRECTIONS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex gap-3 py-1.5 text-[16px] leading-relaxed text-white/70 transition-colors hover:text-white"
                                >
                                    <PinIcon
                                        size={18}
                                        className="mt-1 shrink-0 text-white"
                                    />
                                    <span>
                                        {SITE.address.line1},{" "}
                                        {SITE.address.line2},{" "}
                                        {SITE.address.city},{" "}
                                        {SITE.address.region}{" "}
                                        {SITE.address.postalCode}
                                    </span>
                                </a>
                                <a
                                    href={telLink(SITE.phone)}
                                    onClick={() =>
                                        track("Contact", {
                                            channel: "call",
                                            location: "footer",
                                        })
                                    }
                                    className="flex items-center gap-3 py-1.5 text-[16px] text-white/70 transition-colors hover:text-white"
                                >
                                    <PhoneIcon
                                        size={18}
                                        className="shrink-0 text-white"
                                    />
                                    <span className="tnum">
                                        {SITE.phoneDisplay}
                                    </span>
                                </a>
                                <a
                                    href={`mailto:${SITE.email}`}
                                    className="flex items-center gap-3 py-1.5 text-[16px] text-white/70 transition-colors hover:text-white"
                                >
                                    <MailIcon
                                        size={18}
                                        className="shrink-0 text-white"
                                    />
                                    <span className="break-all">
                                        {SITE.email}
                                    </span>
                                </a>
                            </address>
                            {SITE.hours && (
                                <p className="mt-3 text-sm text-white/60">
                                    {SITE.hours}
                                </p>
                            )}
                            {SITE.rera && (
                                <p className="mt-3 text-sm text-white/60">
                                    RERA registration: {SITE.rera}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-14 flex flex-col gap-2 border-t border-white/15 py-6 text-[14px] text-white/50 md:flex-row md:items-center md:justify-between">
                        <p>
                            © {year} {SITE.name}. All rights reserved.
                        </p>
                        <p>
                            Prices shown are asking prices at the time of
                            listing and may change.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
