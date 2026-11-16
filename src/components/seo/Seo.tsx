import Head from "next/head";
import { ALLOW_INDEXING, SITE, SITE_URL } from "src/config/site";

export interface SeoProps {
    title: string;
    description: string;
    /** Path beginning with "/". Used for canonical + og:url. */
    path?: string;
    /** Absolute image URL, ideally 1200x630. */
    image?: string;
    type?: "website" | "article" | "product";
    noindex?: boolean;
    /** Append " | Real Property Solution" to the title (default). Listing titles are already long. */
    brand?: boolean;
    jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export const DEFAULT_OG_IMAGE =
    "https://res.cloudinary.com/dqutscb7e/image/upload/c_fill,g_auto,w_1200,h_630,q_auto,f_jpg/v1721627891/Properties/o1vzghy08k9awfu2va3c.jpg";

export const absoluteUrl = (path = "/") =>
    path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;

export const Seo = ({
    title,
    description,
    path = "/",
    image = DEFAULT_OG_IMAGE,
    type = "website",
    noindex = false,
    brand = true,
    jsonLd,
}: SeoProps) => {
    const fullTitle =
        !brand || title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;
    const canonical = absoluteUrl(path);
    const robots =
        !ALLOW_INDEXING || noindex
            ? "noindex,nofollow"
            : "index,follow,max-image-preview:large";
    const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

    return (
        <Head>
            <title key="title">{fullTitle}</title>
            <meta key="description" name="description" content={description} />
            <meta key="robots" name="robots" content={robots} />
            <link key="canonical" rel="canonical" href={canonical} />

            <meta
                key="og:site_name"
                property="og:site_name"
                content={SITE.name}
            />
            <meta key="og:locale" property="og:locale" content="en_IN" />
            <meta key="og:type" property="og:type" content={type} />
            <meta key="og:title" property="og:title" content={fullTitle} />
            <meta
                key="og:description"
                property="og:description"
                content={description}
            />
            <meta key="og:url" property="og:url" content={canonical} />
            <meta key="og:image" property="og:image" content={image} />
            <meta
                key="og:image:width"
                property="og:image:width"
                content="1200"
            />
            <meta
                key="og:image:height"
                property="og:image:height"
                content="630"
            />

            <meta
                key="twitter:card"
                name="twitter:card"
                content="summary_large_image"
            />
            <meta
                key="twitter:title"
                name="twitter:title"
                content={fullTitle}
            />
            <meta
                key="twitter:description"
                name="twitter:description"
                content={description}
            />
            <meta key="twitter:image" name="twitter:image" content={image} />

            {blocks.map((b, i) => (
                <script
                    key={`ld-${i}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(b) }}
                />
            ))}
        </Head>
    );
};

/* ---------- JSON-LD builders ---------- */

export const agentSchema = () => ({
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE_URL}/#agent`,
    name: SITE.name,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: DEFAULT_OG_IMAGE,
    telephone: SITE.phone,
    email: SITE.email,
    description: SITE.description,
    address: {
        "@type": "PostalAddress",
        streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
        addressLocality: SITE.address.city,
        addressRegion: SITE.address.region,
        postalCode: SITE.address.postalCode,
        addressCountry: SITE.address.country,
    },
    areaServed: { "@type": "City", name: "Ahmedabad" },
    sameAs: [SITE.social.instagram, SITE.social.facebook],
    ...(SITE.hours ? { openingHours: SITE.hours } : {}),
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        item: absoluteUrl(it.path),
    })),
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
});
