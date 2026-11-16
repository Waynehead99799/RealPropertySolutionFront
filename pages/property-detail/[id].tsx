import type { GetServerSideProps } from "next";
import { fetchListings } from "src/lib/properties";

/**
 * Legacy URL: /property-detail/<database id>.
 * Old links (shared on WhatsApp, indexed by Google) 301 to the new slug URL.
 */
const LegacyPropertyRedirect = () => null;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = String(params?.id || "");
    try {
        const all = await fetchListings();
        const match = all.find((l) => l.id === id);
        if (match)
            return { redirect: { destination: match.path, permanent: true } };
    } catch {
        /* fall through to the listings page */
    }
    return { redirect: { destination: "/properties", permanent: false } };
};

export default LegacyPropertyRedirect;
