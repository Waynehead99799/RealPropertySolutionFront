/**
 * Tracking layer (GTM / GA4 / Meta Pixel).
 *
 * - Nothing loads until IDs are configured (NEXT_PUBLIC_GTM_ID, NEXT_PUBLIC_GA4_ID,
 *   NEXT_PUBLIC_META_PIXEL_ID) AND the visitor accepts the consent banner.
 * - Events follow the audit brief: PageView, ViewContent, Search, Lead, Contact.
 * - Every conversion carries an event_id so browser + Conversions API de-duplicate.
 */
import { SITE } from "src/config/site";

declare global {
    interface Window {
        dataLayer?: Record<string, unknown>[];
        fbq?: (...args: unknown[]) => void;
        gtag?: (...args: unknown[]) => void;
    }
}

export const CONSENT_KEY = "rps-consent-v1";
export type Consent = "granted" | "denied" | null;

export const trackingConfigured = () =>
    Boolean(
        SITE.tracking.gtmId || SITE.tracking.ga4Id || SITE.tracking.metaPixelId,
    );

export const getConsent = (): Consent => {
    try {
        const v = window.localStorage.getItem(CONSENT_KEY);
        return v === "granted" || v === "denied" ? v : null;
    } catch {
        return null;
    }
};

export const setConsent = (value: "granted" | "denied") => {
    try {
        window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
        /* private mode: ignore, banner will simply ask again */
    }
    window.dispatchEvent(new CustomEvent("rps-consent", { detail: value }));
};

export const makeEventId = () =>
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

export type TrackName =
    | "PageView"
    | "ViewContent"
    | "Search"
    | "Lead"
    | "Contact";

const GA_NAMES: Record<TrackName, string> = {
    PageView: "page_view",
    ViewContent: "view_item",
    Search: "search",
    Lead: "generate_lead",
    Contact: "contact",
};

export const track = (
    name: TrackName,
    params: Record<string, unknown> = {},
    eventId?: string,
) => {
    if (typeof window === "undefined" || getConsent() !== "granted") return;
    const id = eventId || makeEventId();
    const { gtmId, ga4Id, metaPixelId } = SITE.tracking;

    if (gtmId) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: name, event_id: id, ...params });
    } else if (ga4Id && window.gtag) {
        window.gtag("event", GA_NAMES[name], { event_id: id, ...params });
    }
    // With GTM the Pixel is normally managed inside the container; otherwise fire directly.
    if (!gtmId && metaPixelId && window.fbq) {
        window.fbq("track", name, params, { eventID: id });
    }
};

/* ---------- Attribution (UTM + click IDs) ---------- */

const ATTR_KEY = "rps-attribution-v1";
const ATTR_PARAMS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "fbclid",
    "gclid",
] as const;

export type Attribution = Partial<
    Record<(typeof ATTR_PARAMS)[number], string>
> & {
    landing_page?: string;
    referrer?: string;
};

export const captureAttribution = () => {
    try {
        const url = new URL(window.location.href);
        const found: Attribution = {};
        ATTR_PARAMS.forEach((k) => {
            const v = url.searchParams.get(k);
            if (v) found[k] = v.slice(0, 200);
        });
        const existing = window.localStorage.getItem(ATTR_KEY);
        // keep the first landing, but let a fresh campaign click override
        if (Object.keys(found).length || !existing) {
            window.localStorage.setItem(
                ATTR_KEY,
                JSON.stringify({
                    ...found,
                    landing_page: url.pathname,
                    referrer: document.referrer || "",
                }),
            );
        }
    } catch {
        /* storage unavailable */
    }
};

const readCookie = (name: string) => {
    const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return m ? decodeURIComponent(m[1]) : "";
};

export const getAttribution = (): Attribution & {
    fbp?: string;
    fbc?: string;
} => {
    try {
        const stored = JSON.parse(
            window.localStorage.getItem(ATTR_KEY) || "{}",
        ) as Attribution;
        return { ...stored, fbp: readCookie("_fbp"), fbc: readCookie("_fbc") };
    } catch {
        return {};
    }
};
