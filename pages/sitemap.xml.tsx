import type { GetServerSideProps } from "next";
import { AREAS, CATEGORY_KEYS, SITE_URL } from "src/config/site";
import { fetchListings } from "src/lib/properties";

const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const SitemapXml = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const entries: { loc: string; lastmod?: string; priority: string }[] = [
        { loc: "/", priority: "1.0" },
        { loc: "/properties", priority: "0.9" },
        ...CATEGORY_KEYS.map((k) => ({ loc: `/${k}`, priority: "0.9" })),
        ...AREAS.map((a) => ({ loc: `/areas/${a.slug}`, priority: "0.7" })),
        { loc: "/about", priority: "0.6" },
        { loc: "/contact", priority: "0.6" },
        { loc: "/terms", priority: "0.2" },
        { loc: "/privacy-policy", priority: "0.2" },
    ];

    try {
        const listings = await fetchListings();
        listings.forEach((l) =>
            entries.push({
                loc: l.path,
                lastmod: l.createdAt ? l.createdAt.slice(0, 10) : undefined,
                priority: "0.8",
            }),
        );
    } catch {
        /* serve the static part if the catalogue API is down */
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
    .map(
        (e) =>
            `  <url><loc>${esc(
                SITE_URL + (e.loc === "/" ? "/" : e.loc),
            )}</loc>${
                e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""
            }<priority>${e.priority}</priority></url>`,
    )
    .join("\n")}
</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=3600, stale-while-revalidate=86400",
    );
    res.write(xml);
    res.end();
    return { props: {} };
};

export default SitemapXml;
