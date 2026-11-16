import type { NextPage } from "next";
import React from "react";
import { PHOTO_CREDITS } from "src/config/site";
import { LegalPage } from "@components/layout/LegalPage";

const PhotoCredits: NextPage = () => (
    <LegalPage
        title="Photo credits"
        seoTitle="Photo Credits | Real Property Solution"
        description="Credits for third-party photography used on the Real Property Solution website."
        path="/photo-credits"
        updated="November 2026"
    >
        <p>
            Photographs of listed properties belong to their owners, developers
            or Real Property Solution. The aerial and skyline photographs below
            are used under open licences.
        </p>
        <ul>
            {PHOTO_CREDITS.map((c) => (
                <li key={c.title}>
                    <a
                        href={c.source}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {c.title}
                    </a>{" "}
                    by {c.author}, licensed{" "}
                    <a
                        href={c.licenseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {c.license}
                    </a>
                    . Used on: {c.use}.
                </li>
            ))}
        </ul>
    </LegalPage>
);

export default PhotoCredits;
