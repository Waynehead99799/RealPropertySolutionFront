import type { GetServerSideProps } from "next";
import { ALLOW_INDEXING, SITE_URL } from "src/config/site";

const RobotsTxt = () => null;

/** Environment-aware: staging/local stays closed, production is open and points at the sitemap. */
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const body = ALLOW_INDEXING
        ? `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /thank-you\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
        : `User-agent: *\nDisallow: /\n`;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=3600, stale-while-revalidate=86400",
    );
    res.write(body);
    res.end();
    return { props: {} };
};

export default RobotsTxt;
