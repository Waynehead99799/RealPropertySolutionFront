import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { API_BASE, SITE, SITE_URL } from "src/config/site";
import { normalizeIndianPhone } from "src/lib/format";

/**
 * Enquiry endpoint.
 *  1. validates + spam-filters server-side (honeypot, speed check, rate limit)
 *  2. forwards the lead to the existing backend mailer (/general/sendmail)
 *  3. optionally mirrors a hashed Lead event to Meta's Conversions API
 *     when META_PIXEL_ID and META_CAPI_TOKEN are set (shared event_id for de-dup)
 */

const hits = new Map<string, number[]>();
const RATE_WINDOW = 10 * 60 * 1000;
const RATE_MAX = 6;

const limited = (ip: string) => {
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW);
    recent.push(now);
    hits.set(ip, recent);
    return recent.length > RATE_MAX;
};

const sha = (v: string) =>
    crypto.createHash("sha256").update(v.trim().toLowerCase()).digest("hex");
/** Strips control characters (code < 32) and trims to a safe length. */
const clean = (v: unknown, max = 500) =>
    typeof v === "string"
        ? v
              .split("")
              .map((c) => (c.charCodeAt(0) < 32 ? " " : c))
              .join("")
              .trim()
              .slice(0, max)
        : "";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    const b = (req.body || {}) as Record<string, unknown>;
    const ip =
        (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
        req.socket.remoteAddress ||
        "unknown";

    // Honeypot or bot-speed submissions look successful but go nowhere.
    if (clean(b.website) || Number(b.elapsed) < 1500) {
        return res.status(200).json({ ok: true });
    }
    if (limited(ip)) {
        return res.status(429).json({
            ok: false,
            error: "Too many requests. Please call or WhatsApp us.",
        });
    }

    const name = clean(b.name, 80);
    const phone = normalizeIndianPhone(clean(b.phone, 20));
    const email = clean(b.email, 120);
    const errors: Record<string, string> = {};
    if (name.length < 2) errors.name = "Enter your name";
    if (!phone) errors.phone = "Enter a valid 10-digit mobile number";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        errors.email = "Enter a valid email address";
    if (Object.keys(errors).length)
        return res.status(422).json({ ok: false, errors });

    const attr = (b.attribution || {}) as Record<string, string>;
    const lines = [
        `New website enquiry`,
        `Intent: ${clean(b.intent, 40) || "Not specified"}`,
        `Property type: ${clean(b.propertyType, 40) || "Not specified"}`,
        `Preferred area: ${clean(b.area, 60) || "Not specified"}`,
        `Budget: ${clean(b.budget, 60) || "Not specified"}`,
        b.listing ? `Listing: ${clean(b.listing, 120)}` : "",
        `Phone: +91 ${phone}`,
        `Email: ${email || "Not provided"}`,
        `Message: ${clean(b.message, 1200) || "(none)"}`,
        ``,
        `Page: ${clean(b.page, 200)}`,
        attr.utm_source
            ? `Source: ${clean(attr.utm_source, 80)} / ${clean(
                  attr.utm_medium,
                  80,
              )} / ${clean(attr.utm_campaign, 120)}`
            : "",
        attr.fbclid ? `fbclid: ${clean(attr.fbclid, 200)}` : "",
    ].filter((l) => l !== "");

    try {
        const upstream = await fetch(`${API_BASE}/general/sendmail`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // The mailer requires an email: fall back to our own so the lead is still delivered.
            body: JSON.stringify({
                name,
                phone,
                email: email || SITE.email,
                message: lines.join("\n"),
            }),
        });
        if (!upstream.ok) throw new Error(`mailer ${upstream.status}`);
    } catch (e) {
        console.error("[lead] forward failed", e);
        return res.status(502).json({
            ok: false,
            error: "We could not send your enquiry. Please call or WhatsApp us.",
        });
    }

    // Conversions API (optional, best effort, never blocks the response).
    const pixel = process.env.META_PIXEL_ID || SITE.tracking.metaPixelId;
    const token = process.env.META_CAPI_TOKEN;
    if (pixel && token) {
        try {
            await fetch(
                `https://graph.facebook.com/v19.0/${pixel}/events?access_token=${token}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        data: [
                            {
                                event_name: "Lead",
                                event_time: Math.floor(Date.now() / 1000),
                                event_id: clean(b.eventId, 80) || undefined,
                                action_source: "website",
                                event_source_url: `${SITE_URL}${clean(
                                    b.page,
                                    200,
                                )}`,
                                user_data: {
                                    ph: [sha(`91${phone}`)],
                                    ...(email ? { em: [sha(email)] } : {}),
                                    client_ip_address: ip,
                                    client_user_agent:
                                        req.headers["user-agent"] || "",
                                    fbp: clean(attr.fbp, 100) || undefined,
                                    fbc: clean(attr.fbc, 200) || undefined,
                                },
                                custom_data: {
                                    currency: "INR",
                                    content_category: clean(b.propertyType, 40),
                                },
                            },
                        ],
                    }),
                },
            );
        } catch (e) {
            console.error("[lead] capi failed", e);
        }
    }

    return res.status(200).json({ ok: true });
}
