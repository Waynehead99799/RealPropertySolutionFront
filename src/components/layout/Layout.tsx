import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { SITE } from "src/config/site";
import { track } from "src/lib/analytics";
import { telLink, waLink } from "src/lib/format";
import { useScrollFx } from "src/lib/scrollfx";
import { PhoneIcon, WhatsAppIcon } from "src/components/ui/Icons";
import { agentSchema } from "src/components/seo/Seo";
import { Analytics } from "./Analytics";
import { AskWidget } from "./AskWidget";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ShortlistDrawer } from "./ShortlistDrawer";

export interface LayoutOptions {
    /** Pre-filled WhatsApp text for the mobile bar and header buttons. */
    waMessage?: string;
    /** Name (and reference) of the listing being viewed, for "Ask us". */
    askContext?: string;
    /** Where the mobile "Enquire" button goes. Listing pages use "#enquire". */
    enquireHref?: string;
    /** Landing pages hide site navigation and footer. */
    minimal?: boolean;
}

const DEFAULT_WA = "Hi, I'm looking for a property in Ahmedabad.";

/** Mobile bar: Call / WhatsApp / Enquire, always one tap away. */
const MobileBar = ({
    waMessage,
    enquireHref,
}: {
    waMessage: string;
    enquireHref: string;
}) => (
    <div className="safe-bottom bar-in fixed inset-x-0 bottom-0 z-30 border-t-2 border-ink bg-white lg:hidden">
        <div className="grid grid-cols-3 gap-2 px-3 py-2.5">
            <a
                href={telLink(SITE.phone)}
                onClick={() =>
                    track("Contact", {
                        channel: "call",
                        location: "mobile-bar",
                    })
                }
                className="btn btn-outline btn-sm !gap-1.5 !px-2"
            >
                <PhoneIcon size={17} className="shrink-0" /> Call
            </a>
            <a
                href={waLink(SITE.whatsapp, waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                    track("Contact", {
                        channel: "whatsapp",
                        location: "mobile-bar",
                    })
                }
                className="btn btn-whatsapp btn-sm !gap-1.5 !px-2"
            >
                <WhatsAppIcon size={18} className="shrink-0" /> WhatsApp
            </a>
            {enquireHref.startsWith("#") ? (
                <a href={enquireHref} className="btn btn-primary btn-sm !px-2">
                    Enquire
                </a>
            ) : (
                <Link href={enquireHref}>
                    <a className="btn btn-primary btn-sm !px-2">Enquire</a>
                </Link>
            )}
        </div>
    </div>
);

export const Layout = ({
    children,
    waMessage,
    askContext,
    enquireHref = "/contact",
    minimal = false,
}: LayoutOptions & { children: React.ReactNode }) => {
    const router = useRouter();
    useScrollFx();
    const wa = waMessage || DEFAULT_WA;

    return (
        <>
            <a
                href="#main"
                className="fixed left-3 top-3 z-[70] -translate-y-[200%] bg-ink px-4 py-3 text-sm font-semibold text-white focus:translate-y-0"
            >
                Skip to content
            </a>
            <Head>
                <script
                    key="ld-agent"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(agentSchema()),
                    }}
                />
            </Head>
            {!minimal && <Header />}
            {/* key (path only, never the query) re-runs the 200ms fade on route changes; filters do not remount the page */}
            <main
                id="main"
                key={router.asPath.split("#")[0].split("?")[0]}
                className="fade-in"
            >
                {!minimal && <div aria-hidden className="h-[72px]" />}
                {children}
            </main>
            {!minimal && <Footer />}
            <MobileBar waMessage={wa} enquireHref={enquireHref} />
            <AskWidget context={askContext} />
            <ShortlistDrawer />
            <Analytics />
        </>
    );
};
