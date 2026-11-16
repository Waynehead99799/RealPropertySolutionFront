import type { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { SITE } from "src/config/site";
import { waLink } from "src/lib/format";
import { Seo } from "@components/seo/Seo";
import { CheckIcon, WhatsAppIcon } from "@components/ui/Icons";

/** Conversion page: GTM/Meta can trigger on the /thank-you URL as well as the Lead event. */
const ThankYou: NextPage = () => (
    <>
        <Seo
            title="Thank you | Real Property Solution"
            description="We have received your enquiry."
            path="/thank-you"
            noindex
        />
        <section className="bg-crimson text-white">
            <div className="shell flex min-h-[70vh] flex-col items-start justify-center py-16">
                <span className="mb-6 flex h-16 w-16 items-center justify-center bg-white text-crimson">
                    <CheckIcon size={36} strokeWidth={3} />
                </span>
                <h1 className="display display-xl !text-white">
                    <span className="line">
                        <span>Thank you.</span>
                    </span>
                </h1>
                <p
                    className="rise mt-5 max-w-[46ch] text-[20px] leading-relaxed text-white/90"
                    style={{ ["--i" as string]: 3 }}
                >
                    We have your enquiry and our team will call you shortly. If
                    it is urgent, message us on WhatsApp and we will reply
                    there.
                </p>
                <div
                    className="rise mt-8 flex flex-wrap gap-3"
                    style={{ ["--i" as string]: 4 }}
                >
                    <a
                        href={waLink(
                            SITE.whatsapp,
                            "Hi, I just sent an enquiry on your website.",
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-white btn-lg"
                    >
                        <WhatsAppIcon size={22} /> Continue on WhatsApp
                    </a>
                    <Link href="/properties">
                        <a className="btn btn-dark btn-lg">Browse portfolio</a>
                    </Link>
                </div>
            </div>
        </section>
    </>
);

export default ThankYou;
