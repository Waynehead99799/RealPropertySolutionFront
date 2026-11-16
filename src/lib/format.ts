/** Indian-market formatting helpers. */

const inFmt = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

export const formatNumber = (n: number) => inFmt.format(Math.round(n));

export const formatINR = (n: number) => `₹${formatNumber(n)}`;

const trim = (n: number, digits: number) =>
    Number(n.toFixed(digits)).toString();

/** 22000000 -> "₹2.2 Cr", 2300000 -> "₹23 Lakh", 70300 -> "₹70,300". */
export const formatCompactINR = (n: number) => {
    if (n >= 1e7) return `₹${trim(n / 1e7, 2)} Cr`;
    if (n >= 1e5) return `₹${trim(n / 1e5, 2)} Lakh`;
    return formatINR(n);
};

export const slugify = (s: string) =>
    s
        .toLowerCase()
        .replace(/&/g, " and ")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

const KEEP_UPPER = /^(sg|sp|rera|bhk|gidc|it|ac|ii|iii|iv|\d+[a-z]?)$/i;

/** "SANKALP SQUARE 3B" -> "Sankalp Square 3B". Safe on already-cased text. */
export const toTitleCase = (s: string) =>
    s
        .toLowerCase()
        .split(/(\s+|-)/)
        .map((w) => {
            if (!w.trim() || w === "-") return w;
            if (KEEP_UPPER.test(w) && /\d/.test(w)) return w.toUpperCase();
            if (/^(sg|sp|rera|bhk|gidc)$/i.test(w)) return w.toUpperCase();
            return w.charAt(0).toUpperCase() + w.slice(1);
        })
        .join("");

export const sentenceCase = (s: string) => {
    const t = s.trim().toLowerCase().replace(/\s+/g, " ");
    return t.charAt(0).toUpperCase() + t.slice(1);
};

export const shortId = (id: string) => id.slice(-5);

/** Compose a wa.me link with a pre-filled message. */
export const waLink = (number: string, text?: string) =>
    `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const telLink = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

/** Digits only, India: accepts 10 digits, or +91 / 0 prefix. Returns 10 digits or "". */
export const normalizeIndianPhone = (raw: string) => {
    const d = raw.replace(/\D/g, "");
    const ten = d.length > 10 ? d.slice(-10) : d;
    return /^[6-9]\d{9}$/.test(ten) ? ten : "";
};
