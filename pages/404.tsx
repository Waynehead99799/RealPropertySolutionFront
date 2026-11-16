import type { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { Seo } from "@components/seo/Seo";
import { Photo } from "@components/ui/Photo";

const NotFound: NextPage = () => (
    <>
        <Seo
            title="Page not found | Real Property Solution"
            description="This page could not be found."
            path="/404"
            noindex
        />
        <section className="relative isolate overflow-hidden bg-ink">
            <Photo
                name="aero-warehouse"
                priority
                className="absolute inset-0 -z-10 h-full w-full object-cover"
                position="50% 58%"
            />
            <div
                aria-hidden
                className="absolute inset-0 -z-10"
                style={{
                    background:
                        "linear-gradient(90deg, rgba(17,18,20,0.85) 0%, rgba(17,18,20,0.5) 60%, rgba(17,18,20,0.15) 100%)",
                }}
            />
            <div className="shell flex min-h-[70vh] flex-col items-start justify-center py-16 text-white">
                <p className="font-display text-[clamp(7rem,28vw,24rem)] font-black leading-[0.8] text-white">
                    404
                </p>
                <h1 className="display display-md mt-6 max-w-[16ch] !text-white">
                    <span className="line">
                        <span>Sold, let, or never listed</span>
                    </span>
                </h1>
                <p className="mt-4 max-w-[56ch] text-[19px] leading-relaxed text-white/90">
                    This page has moved or never existed. Browse what is
                    available today.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/properties">
                        <a className="btn btn-primary btn-lg">View portfolio</a>
                    </Link>
                    <Link href="/">
                        <a className="btn btn-outline-light btn-lg">
                            Go to home
                        </a>
                    </Link>
                </div>
            </div>
        </section>
    </>
);

export default NotFound;
