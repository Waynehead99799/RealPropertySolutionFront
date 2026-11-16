import { AREAS, API_BASE, CategoryKey } from "src/config/site";
import {
    formatCompactINR,
    formatINR,
    formatNumber,
    sentenceCase,
    shortId,
    slugify,
    toTitleCase,
} from "./format";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export interface RawProperty {
    _id: string;
    title?: string;
    description?: string;
    price?: number;
    address?: string;
    type?: string;
    status?: string;
    images?: string[];
    features?: string[];
    detail?: {
        bed?: number | null;
        bath?: number | null;
        levels?: number | null;
        sqft?: number | null;
    };
    location?: {
        area?: string;
        street_address?: string;
        city?: string;
        zip_code?: string;
    };
    agent?: {
        name?: string;
        phoneNumber?: string;
        email?: string;
        profileImage?: string;
    };
    createdAt?: string;
}

export interface Listing {
    id: string;
    /** Short reference quoted in enquiries, e.g. RPS-003. */
    ref: string;
    slug: string;
    path: string;
    name: string;
    kind: string;
    category: CategoryKey;
    deal: "sale" | "rent";
    dealLabel: string;
    preLeased: boolean;
    price: number;
    priceLabel: string;
    priceSuffix: string;
    perSqft: string;
    sqft: number | null;
    furnishing: string;
    beds: number | null;
    baths: number | null;
    floors: number | null;
    locality: string;
    areaKey: string;
    areaName: string;
    address: string;
    pincode: string;
    cover: string | null;
    /** Native pixel width of the cover: layouts never show it larger. */
    coverW: number;
    images: string[];
    /** Native widths, same order as images. */
    imageWidths: number[];
    amenities: string[];
    note: string;
    summary: string;
    seoTitle: string;
    seoDescription: string;
    createdAt: string;
}

/* ------------------------------------------------------------------ */
/* Normalisation: the backend data has typos, ALL-CAPS and a plot      */
/* filed as residential. We clean it once, at the edge.                */
/* ------------------------------------------------------------------ */

const TEXT_FIXES: [RegExp, string][] = [
    [/\bAhmadabad\b/gi, "Ahmedabad"],
    [/\bGuj?arat\b/gi, "Gujarat"],
    [/\bGujrat\b/gi, "Gujarat"],
    [/\bNalsalovar\b/gi, "Nalsarovar"],
    [/\bWetgate\b/gi, "Westgate"],
    [/\bMakrba\b/gi, "Makarba"],
    [/\bIsckon\b/gi, "Iskcon"],
    [/\bSindhubhavan\b/gi, "Sindhu Bhavan"],
    [/\bS\.\s?G\.?\s?Highway\b/gi, "SG Highway"],
    [/\bUn\s+furnished\b/gi, "unfurnished"],
    [/\bpre[\s-]?lease\b/gi, "pre-leased"],
    [/(\d)\s*sq-?\s*ft\b/gi, "$1 sq ft"],
];

const cleanText = (s: string) =>
    TEXT_FIXES.reduce((acc, [re, to]) => acc.replace(re, to), s)
        .replace(/\s*,\s*,/g, ",")
        .replace(/\s{2,}/g, " ")
        .replace(/\s+,/g, ",")
        .trim();

const detectKind = (text: string, category: string): string => {
    const t = text.toLowerCase();
    if (/\b(plot|land)\b/.test(t)) return "Plot";
    if (/\b(showroom)\b/.test(t)) return "Showroom";
    if (/\b(shop)\b/.test(t)) return "Shop";
    if (/\b(office|workspace)\b/.test(t)) return "Office space";
    if (/\b(bungalow|villa)\b/.test(t)) return "Bungalow";
    if (/\b(flat|apartment|bhk|penthouse)\b/.test(t)) return "Flat";
    if (category === "commercial") return "Commercial space";
    if (category === "residential") return "Residential property";
    return "Property";
};

const detectFurnishing = (text: string) => {
    const t = text.toLowerCase();
    if (/fully[\s-]?furnished/.test(t)) return "Fully furnished";
    if (/semi[\s-]?furnished/.test(t)) return "Semi-furnished";
    if (/un[\s-]?furnished/.test(t)) return "Unfurnished";
    return "";
};

const detectArea = (text: string) => {
    for (const a of AREAS) if (a.match.test(text)) return a;
    return null;
};

/** The listing form stores the locality inconsistently; prefer a clean street+area. */
const buildLocality = (raw: RawProperty): string => {
    const loc = raw.location || {};
    const address = cleanText(raw.address || "");
    const pinInAddress = (address.match(/\b(\d{6})\b/) || [])[1];
    const zip = (loc.zip_code || "").trim();

    // Zip in the free-text address disagrees with the structured fields:
    // the address is the more specific, trust it.
    if (pinInAddress && zip && pinInAddress !== zip) {
        const parts = address
            .replace(/\b\d{6}\b/, "")
            .split(",")
            .map((p) => p.trim())
            .filter(Boolean)
            .filter((p) => !/^(ahmedabad|gujarat)$/i.test(p));
        // first segment is usually the building / scheme name
        return parts
            .slice(1, 3)
            .map((p) => toTitleCase(p.replace(/^near\s+/i, "")))
            .join(", ");
    }

    const city = (loc.city || "").toLowerCase();
    const street = cleanText(loc.street_address || "");
    let area = cleanText(loc.area || "");
    if (!area || area.toLowerCase() === city) area = "";
    const parts = [street, area]
        .filter(Boolean)
        .map((p) => toTitleCase(p))
        .filter(
            (p, i, arr) =>
                arr.findIndex((x) => x.toLowerCase() === p.toLowerCase()) === i,
        );
    return parts.join(", ");
};

/** Addresses are often typed in ALL CAPS; leave mixed-case ones alone. */
const prettyAddress = (a: string) => (/[a-z]/.test(a) ? a : toTitleCase(a));

const GENERIC_TITLE =
    /(residential\s+land|plot\s+in\s+ahmedabad|land\s*\/\s*plot)/i;

const buildName = (raw: RawProperty): string => {
    const title = cleanText(raw.title || "");
    if (!title || GENERIC_TITLE.test(title)) {
        const first = cleanText(raw.address || "").split(",")[0];
        if (first) return toTitleCase(first);
    }
    return toTitleCase(title || "Property");
};

export const normalizeProperty = (raw: RawProperty): Listing => {
    const rawText = `${raw.title || ""} ${raw.description || ""}`;
    const kind = detectKind(rawText, raw.type || "");
    const category: CategoryKey =
        kind === "Warehouse"
            ? "warehouse"
            : kind === "Plot"
            ? "land"
            : raw.type === "residential"
            ? "residential"
            : "commercial";

    const deal: "sale" | "rent" = /rent|lease/i.test(raw.status || "")
        ? "rent"
        : "sale";
    const price = Number(raw.price) || 0;
    const sqft = Number(raw.detail?.sqft) || null;

    const name = buildName(raw);
    const locality = buildLocality(raw);
    const searchText = `${raw.address || ""} ${raw.location?.area || ""} ${
        raw.location?.street_address || ""
    } ${raw.title || ""}`;
    const area = detectArea(searchText);

    const preLeased = /pre[\s-]?leas/i.test(rawText);
    const furnishing = category === "land" ? "" : detectFurnishing(rawText);

    const isHome = category === "residential";
    const beds = isHome ? Number(raw.detail?.bed) || null : null;
    const baths = isHome ? Number(raw.detail?.bath) || null : null;
    const floors =
        category === "commercial" ? Number(raw.detail?.levels) || null : null;

    const priceLabel =
        deal === "rent" ? formatINR(price) : formatCompactINR(price);
    const priceSuffix = deal === "rent" ? "/ month" : "";
    const perSqft =
        sqft && price
            ? deal === "rent"
                ? `₹${formatNumber(price / sqft)} / sq ft / month`
                : `₹${formatNumber(price / sqft)} / sq ft`
            : "";

    const dealWord = deal === "rent" ? "rent" : "sale";
    const slugParts = [
        slugify(`${kind} for ${dealWord}`),
        slugify(name),
        area ? slugify(area.name) : "",
    ].filter(Boolean);
    const slug = slugParts.join("-");

    const kindLower = kind.toLowerCase();
    const sizePhrase = sqft ? `${formatNumber(sqft)} sq ft ` : "";
    const flags = [preLeased ? "pre-leased" : "", furnishing.toLowerCase()]
        .filter(Boolean)
        .join(", ");
    const where = locality ? `${name}, ${locality}` : name;
    const placeSentence = `${sqft ? `${sizePhrase}` : ""}${
        flags ? `${flags} ` : ""
    }${kindLower}`;
    const priceSentence = price
        ? deal === "rent"
            ? ` Rent is ${formatINR(price)} per month${
                  perSqft
                      ? ` (${perSqft.replace(
                            " / sq ft / month",
                            " per sq ft",
                        )})`
                      : ""
              }.`
            : ` Asking price is ${formatCompactINR(price)}${
                  perSqft
                      ? `, about ${perSqft.replace(" / sq ft", " per sq ft")}`
                      : ""
              }.`
        : "";
    const summary = `${
        placeSentence.charAt(0).toUpperCase() + placeSentence.slice(1)
    } available for ${dealWord} at ${where}, Ahmedabad.${priceSentence} Message us on WhatsApp or request a call and we will arrange a visit.`;

    const description = cleanText(raw.description || "");
    const note = description
        ? sentenceCase(description)
              .replace(/\bahmedabad\b/g, "Ahmedabad")
              .replace(/\bbodakdev\b/g, "Bodakdev")
              .replace(/\bwestgate\b/g, "Westgate")
              .replace(/\bsg highway\b/g, "SG Highway")
              .replace(/\bsindhu bhavan road\b/g, "Sindhu Bhavan Road")
              .replace(/\bd block\b/g, "D Block")
        : "";

    const images = (raw.images || []).filter(Boolean);

    const amenities =
        category === "land"
            ? []
            : (raw.features || [])
                  .map((f) => toTitleCase(cleanText(f)))
                  .filter((f, i, a) => a.indexOf(f) === i);

    const seoPlace = area ? area.name : locality.split(",")[0];
    const seoTitle = `${kind} for ${deal === "rent" ? "Rent" : "Sale"} in ${
        seoPlace || "Ahmedabad"
    }${sqft ? `, ${formatNumber(sqft)} sq ft` : ""} | ${name}`;
    const seoDescription = `${kind} for ${dealWord} at ${name}${
        locality ? `, ${locality}` : ""
    }. ${sqft ? `${formatNumber(sqft)} sq ft, ` : ""}${priceLabel}${
        priceSuffix ? ` ${priceSuffix}` : ""
    }. Talk to Real Property Solution, Ahmedabad.`;

    return {
        id: raw._id,
        ref: "",
        slug,
        path: `/${category}/${slug}`,
        name,
        kind,
        category,
        deal,
        dealLabel: deal === "rent" ? "For rent" : "For sale",
        preLeased,
        price,
        priceLabel,
        priceSuffix,
        perSqft,
        sqft,
        furnishing,
        beds,
        baths,
        floors,
        locality,
        areaKey: area ? area.slug : "",
        areaName: area ? area.name : "",
        address: prettyAddress(cleanText(raw.address || "")),
        pincode:
            (raw.address || "").match(/\b(\d{6})\b/)?.[1] ||
            raw.location?.zip_code ||
            "",
        cover: images[0] || null,
        coverW: 0,
        images,
        imageWidths: [],
        amenities,
        note,
        summary,
        seoTitle:
            seoTitle.length > 70
                ? `${kind} for ${deal === "rent" ? "Rent" : "Sale"} | ${name}`
                : seoTitle,
        seoDescription,
        createdAt: raw.createdAt || "",
    };
};

/** Make slugs unique even if two listings collide. */
export const withUniqueSlugs = (list: Listing[]): Listing[] => {
    const seen: Record<string, number> = {};
    return list.map((l) => {
        seen[l.slug] = (seen[l.slug] || 0) + 1;
        if (seen[l.slug] === 1) return l;
        const slug = `${l.slug}-${shortId(l.id)}`;
        return { ...l, slug, path: `/${l.category}/${slug}` };
    });
};

/* ------------------------------------------------------------------ */
/* Fetching (server-side, used from getStaticProps)                    */
/* ------------------------------------------------------------------ */

const getJson = async (path: string, init?: RequestInit): Promise<any> => {
    let lastErr: unknown;
    for (let attempt = 0; attempt < 3; attempt++) {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 10000);
        try {
            const res = await fetch(`${API_BASE}${path}`, {
                ...init,
                signal: ctrl.signal,
                headers: { Accept: "application/json" },
            });
            if (!res.ok) throw new Error(`API ${res.status} for ${path}`);
            return await res.json();
        } catch (e) {
            lastErr = e;
        } finally {
            clearTimeout(timer);
        }
    }
    throw lastErr;
};

const isBuild = () => process.env.NEXT_PHASE === "phase-production-build";

/* ------------------------------------------------------------------ */
/* Image quality guard                                                 */
/* The client's uploads vary from 228px thumbnails to 1280px photos.    */
/* We read each image's real size from Cloudinary, drop duplicates and  */
/* anything too small to show sharply, and let layouts cap display size */
/* at the native width. Result: no stretched, blurry photos.            */
/* ------------------------------------------------------------------ */

const MIN_GALLERY_WIDTH = 900;
const metaCache = new Map<string, { w: number; h: number; bytes: number }>();

const readImageMeta = async (url: string) => {
    const hit = metaCache.get(url);
    if (hit) return hit;
    try {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 8000);
        const res = await fetch(
            url.replace("/image/upload/", "/image/upload/fl_getinfo/"),
            { signal: ctrl.signal },
        );
        clearTimeout(timer);
        const j = await res.json();
        const m = {
            w: Number(j?.input?.width) || 0,
            h: Number(j?.input?.height) || 0,
            bytes: Number(j?.input?.bytes) || 0,
        };
        if (m.w) metaCache.set(url, m);
        return m;
    } catch {
        return { w: 0, h: 0, bytes: 0 };
    }
};

export const curateImages = async (l: Listing): Promise<Listing> => {
    if (!l.images.length) return l;
    const metas = await Promise.all(l.images.map(readImageMeta));
    const seen = new Set<string>();
    let rows = l.images
        .map((src, i) => ({ src, ...metas[i] }))
        // metadata unavailable: keep, assume a usable size
        .map((r) => (r.w ? r : { ...r, w: 1200, h: 800 }))
        .filter((r) => {
            const key = `${r.w}x${r.h}:${r.bytes}`;
            if (r.bytes && seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    const sharp = rows.filter((r) => r.w >= MIN_GALLERY_WIDTH);
    // If nothing is large enough, keep the single biggest rather than none.
    rows = sharp.length
        ? sharp
        : [rows.slice().sort((a, b) => b.w * b.h - a.w * a.h)[0]];
    rows.sort((a, b) => b.w * b.h - a.w * a.h);
    return {
        ...l,
        images: rows.map((r) => r.src),
        imageWidths: rows.map((r) => r.w),
        cover: rows[0].src,
        coverW: rows[0].w,
    };
};

export const fetchListings = async (): Promise<Listing[]> => {
    try {
        const first = await getJson(`/properties/?limit=100&page=1`);
        let items: RawProperty[] = first?.properties || [];
        const pages = Number(first?.totalPages) || 1;
        for (let p = 2; p <= pages && p <= 10; p++) {
            const next = await getJson(`/properties/?limit=100&page=${p}`);
            items = items.concat(next?.properties || []);
        }
        const normalized = withUniqueSlugs(
            items
                .filter((p) => p && p._id)
                // oldest first so reference numbers stay stable as listings are added
                .sort((a, b) =>
                    (a.createdAt || "").localeCompare(b.createdAt || ""),
                )
                .map(normalizeProperty),
        ).map((l, i) => ({
            ...l,
            ref: `RPS-${String(i + 1).padStart(3, "0")}`,
        }));
        // Keep only sharp, distinct photos, best first (never upscale, no duplicates).
        const withImages = await Promise.all(normalized.map(curateImages));
        // newest first for display
        return withImages.sort((a, b) =>
            b.createdAt.localeCompare(a.createdAt),
        );
    } catch (e) {
        // Keep serving the previous good page at runtime (ISR); never
        // publish an empty catalogue because of a transient API error.
        if (!isBuild()) throw e;
        return [];
    }
};

export interface Agent {
    id: string;
    name: string;
    role: string;
    phone: string;
    image: string;
    /** Native width of the portrait; small ones are shown small. */
    imageW: number;
}

const roleLabel = (r?: string) =>
    /admin/i.test(r || "") ? "Lead property consultant" : "Property consultant";

export const fetchAgents = async (): Promise<Agent[]> => {
    try {
        const data = await getJson(`/agent`);
        const raw: any[] = data?.result || [];
        const metas = await Promise.all(
            raw.map((a) =>
                a.profileImage
                    ? readImageMeta(a.profileImage)
                    : Promise.resolve({ w: 0, h: 0, bytes: 0 }),
            ),
        );
        return raw.map((a: any, i: number) => ({
            imageW: metas[i].w || 600,
            id: a._id,
            name: toTitleCase(a.name || ""),
            role: roleLabel(a.role),
            phone: String(a.phoneNumber || "")
                .replace(/\D/g, "")
                .slice(-10),
            image: a.profileImage || "",
        }));
    } catch (e) {
        if (!isBuild()) throw e;
        return [];
    }
};

/* ------------------------------------------------------------------ */
/* Filtering & sorting (used on the client for instant results)        */
/* ------------------------------------------------------------------ */

export interface ListingFilters {
    deal?: "sale" | "rent" | "";
    category?: CategoryKey | "";
    area?: string;
    min?: number;
    max?: number;
    furnishing?: string;
    q?: string;
    sort?: "new" | "price-asc" | "price-desc" | "size-desc";
}

export const filterListings = (list: Listing[], f: ListingFilters) => {
    const q = (f.q || "").trim().toLowerCase();
    const out = list.filter((l) => {
        if (f.deal && l.deal !== f.deal) return false;
        if (f.category && l.category !== f.category) return false;
        if (f.area && l.areaKey !== f.area) return false;
        if (f.furnishing && l.furnishing !== f.furnishing) return false;
        if (f.min && l.price < f.min) return false;
        if (f.max && l.price > f.max) return false;
        if (
            q &&
            !`${l.name} ${l.locality} ${l.kind} ${l.areaName}`
                .toLowerCase()
                .includes(q)
        )
            return false;
        return true;
    });
    switch (f.sort) {
        case "price-asc":
            return out.sort((a, b) => a.price - b.price);
        case "price-desc":
            return out.sort((a, b) => b.price - a.price);
        case "size-desc":
            return out.sort((a, b) => (b.sqft || 0) - (a.sqft || 0));
        default:
            return out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
};

/** Budget presets differ for sale vs rent (audit: separate ranges, higher cap). */
export const BUDGETS = {
    sale: [
        { label: "Any budget", min: 0, max: 0 },
        { label: "Under ₹25 Lakh", min: 0, max: 2500000 },
        { label: "₹25 Lakh to ₹1 Cr", min: 2500000, max: 10000000 },
        { label: "₹1 Cr to ₹3 Cr", min: 10000000, max: 30000000 },
        { label: "₹3 Cr to ₹10 Cr", min: 30000000, max: 100000000 },
        { label: "Above ₹10 Cr", min: 100000000, max: 0 },
    ],
    rent: [
        { label: "Any budget", min: 0, max: 0 },
        { label: "Under ₹50,000 / month", min: 0, max: 50000 },
        { label: "₹50,000 to ₹1 Lakh", min: 50000, max: 100000 },
        { label: "₹1 Lakh to ₹2 Lakh", min: 100000, max: 200000 },
        { label: "Above ₹2 Lakh / month", min: 200000, max: 0 },
    ],
};

export const areasInUse = (list: Listing[]) => {
    const map = new Map<
        string,
        { slug: string; name: string; count: number }
    >();
    list.forEach((l) => {
        if (!l.areaKey) return;
        const cur = map.get(l.areaKey);
        if (cur) cur.count += 1;
        else
            map.set(l.areaKey, { slug: l.areaKey, name: l.areaName, count: 1 });
    });
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
};

export const coverFor = (l: Listing, w: number, h?: number) =>
    l.cover ? cloudinary(l.cover, w, h) : "";

/** Cloudinary on-the-fly resize + modern format. Falls back to the original URL.
 *  Use gravity "face" for portraits so heads are never cropped off. */
export const cloudinary = (
    url: string,
    w: number,
    h?: number,
    gravity: "auto" | "face" = "auto",
) => {
    if (!url || !url.includes("/image/upload/")) return url;
    // c_lfill / c_limit never scale a picture up, so a small original is
    // delivered at its own size instead of being stretched into blur.
    const t = [
        `f_auto`,
        `q_auto:best`,
        h ? `c_lfill` : `c_limit`,
        h ? `g_${gravity}` : "",
        `w_${w}`,
        h ? `h_${h}` : "",
    ]
        .filter(Boolean)
        .join(",");
    return url.replace("/image/upload/", `/image/upload/${t}/`);
};

export const cloudinarySrcSet = (
    url: string,
    widths: number[],
    ratio?: number,
) =>
    widths
        .map(
            (w) =>
                `${cloudinary(
                    url,
                    w,
                    ratio ? Math.round(w * ratio) : undefined,
                )} ${w}w`,
        )
        .join(", ");
