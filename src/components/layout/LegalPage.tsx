import React from "react";
import { Seo, breadcrumbSchema } from "@components/seo/Seo";
import { PageHead } from "./PageHead";

interface Props {
    title: string;
    seoTitle: string;
    description: string;
    path: string;
    updated: string;
    children: React.ReactNode;
}

export const LegalPage = ({
    title,
    seoTitle,
    description,
    path,
    updated,
    children,
}: Props) => (
    <>
        <Seo
            title={seoTitle}
            description={description}
            path={path}
            jsonLd={breadcrumbSchema([
                { name: "Home", path: "/" },
                { name: title, path },
            ])}
        />
        <PageHead
            title={title}
            blurb={`Last updated ${updated}`}
            crumbs={[{ name: "Home", href: "/" }, { name: title }]}
            image="aero-sabarmati"
        />
        <div className="shell pb-20 pt-10">
            <div className="prose-rps max-w-[72ch]">{children}</div>
        </div>
    </>
);
