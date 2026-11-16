import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { AREAS, SITE } from "src/config/site";
import { getAttribution, makeEventId, track } from "src/lib/analytics";
import { normalizeIndianPhone, telLink, waLink } from "src/lib/format";
import { CheckIcon, PhoneIcon, WhatsAppIcon } from "src/components/ui/Icons";

const INTENTS = [
    { value: "buy", label: "Buy" },
    { value: "lease", label: "Lease or rent" },
    { value: "sell", label: "Sell my property" },
    { value: "list", label: "List for rent" },
];
const TYPES = [
    "Office or shop",
    "Warehouse or shed",
    "Flat or bungalow",
    "Plot or land",
    "Not sure yet",
];
const VISITS = [
    "Just exploring",
    "Today",
    "Tomorrow",
    "This week",
    "Next week",
];

interface Props {
    /** Listing context. Adds the listing to the lead and pre-selects the intent. */
    listing?: {
        id: string;
        ref: string;
        name: string;
        path: string;
        category: string;
        deal: "sale" | "rent";
        price: number;
    };
    /** Tighter layout for sidebars. */
    compact?: boolean;
    heading?: string;
    id?: string;
}

type Errors = Partial<Record<"name" | "phone" | "email" | "consent", string>>;

export const EnquiryForm = ({
    listing,
    compact = false,
    heading,
    id,
}: Props) => {
    const router = useRouter();
    const mountedAt = useRef(Date.now());
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
        "idle",
    );
    const [serverError, setServerError] = useState("");
    const [errors, setErrors] = useState<Errors>({});
    const [intent, setIntent] = useState(
        listing ? (listing.deal === "rent" ? "lease" : "buy") : "buy",
    );
    const formRef = useRef<HTMLFormElement>(null);

    // /contact?intent=list|buy|lease|sell
    useEffect(() => {
        const q = router.query.intent;
        if (
            typeof q === "string" &&
            INTENTS.some((i) => i.value === q) &&
            !listing
        )
            setIntent(q);
    }, [router.query.intent, listing]);

    const fieldId = (n: string) => `${id || "enq"}-${n}`;

    const validate = (fd: FormData): Errors => {
        const e: Errors = {};
        if (String(fd.get("name") || "").trim().length < 2)
            e.name = "Enter your name";
        if (!normalizeIndianPhone(String(fd.get("phone") || "")))
            e.phone = "Enter a valid 10-digit mobile number";
        const email = String(fd.get("email") || "").trim();
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            e.email = "Enter a valid email address";
        if (!fd.get("consent"))
            e.consent = "Please confirm so we can contact you";
        return e;
    };

    const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        if (status === "sending") return;
        const fd = new FormData(ev.currentTarget);
        const found = validate(fd);
        setErrors(found);
        const firstBad = (Object.keys(found) as (keyof Errors)[])[0];
        if (firstBad) {
            formRef.current
                ?.querySelector<HTMLElement>(`[name="${firstBad}"]`)
                ?.focus();
            return;
        }

        setStatus("sending");
        setServerError("");
        const eventId = makeEventId();
        try {
            const res = await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: fd.get("name"),
                    phone: fd.get("phone"),
                    email: fd.get("email"),
                    message: [
                        fd.get("visit") && fd.get("visit") !== VISITS[0]
                            ? `Would like to visit: ${fd.get("visit")}`
                            : "",
                        fd.get("message"),
                    ]
                        .filter(Boolean)
                        .join("\n"),
                    intent: INTENTS.find((i) => i.value === intent)?.label,
                    propertyType: fd.get("propertyType"),
                    area: fd.get("area"),
                    budget: fd.get("budget"),
                    listing: listing
                        ? `${listing.name} ${listing.ref} (${SITE.url}${listing.path})`
                        : "",
                    page: window.location.pathname,
                    website: fd.get("website"),
                    elapsed: Date.now() - mountedAt.current,
                    eventId,
                    attribution: getAttribution(),
                }),
            });
            const data = await res.json().catch(() => ({}));
            if (res.status === 422 && data.errors) {
                setErrors(data.errors);
                setStatus("idle");
                return;
            }
            if (!res.ok || !data.ok) throw new Error(data.error || "Failed");

            track(
                "Lead",
                {
                    content_ids: listing ? [listing.id] : undefined,
                    content_category: listing?.category,
                    value: listing?.price,
                    currency: "INR",
                    intent,
                },
                eventId,
            );
            setStatus("sent");
            formRef.current?.reset();
            window.setTimeout(
                () =>
                    router.push(
                        `/thank-you${
                            listing
                                ? `?from=${encodeURIComponent(
                                      listing.category,
                                  )}`
                                : ""
                        }`,
                    ),
                1100,
            );
        } catch (e) {
            setServerError(
                e instanceof Error && e.message !== "Failed"
                    ? e.message
                    : "We could not send your enquiry. Please call or WhatsApp us.",
            );
            setStatus("error");
        }
    };

    if (status === "sent") {
        return (
            <div
                className="pop-in p-8 text-center"
                role="status"
                aria-live="polite"
            >
                <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-success text-white">
                    <CheckIcon size={34} strokeWidth={2.6} />
                </span>
                <h3 className="font-display text-[44px] font-extrabold uppercase leading-[0.95] text-ink">
                    Thank you, we have your enquiry
                </h3>
                <p className="mt-2 text-slate-600">
                    Our team will call you shortly.
                </p>
            </div>
        );
    }

    const err = (k: keyof Errors) =>
        errors[k] ? (
            <p id={fieldId(`${k}-err`)} className="field-error" role="alert">
                {errors[k]}
            </p>
        ) : null;
    const a11y = (k: keyof Errors) => ({
        "aria-invalid": errors[k] ? (true as const) : undefined,
        "aria-describedby": errors[k] ? fieldId(`${k}-err`) : undefined,
    });

    return (
        <form
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            className="relative text-left"
            aria-label={heading || "Enquiry form"}
            id={id}
        >
            {heading && (
                <h3 className="mb-5 font-display text-[40px] font-extrabold uppercase leading-[0.92] text-ink">
                    {heading}
                </h3>
            )}

            {!listing && (
                <fieldset className="mb-5">
                    <legend className="field-label">I am looking to</legend>
                    <div className="grid grid-cols-2 gap-2">
                        {INTENTS.map((i) => (
                            <label
                                key={i.value}
                                className={`flex min-h-[48px] cursor-pointer items-center justify-center border-2 px-2 text-center font-display text-[19px] font-extrabold uppercase tracking-[0.04em] transition-colors duration-150 ${
                                    intent === i.value
                                        ? "border-ink bg-ink text-white"
                                        : "border-concrete-300 bg-white text-ink hover:border-ink"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="intent"
                                    value={i.value}
                                    checked={intent === i.value}
                                    onChange={() => setIntent(i.value)}
                                    className="sr-only"
                                />
                                {i.label}
                            </label>
                        ))}
                    </div>
                </fieldset>
            )}

            <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
                <div>
                    <label className="field-label" htmlFor={fieldId("name")}>
                        Full name
                    </label>
                    <input
                        id={fieldId("name")}
                        name="name"
                        type="text"
                        autoComplete="name"
                        className="field"
                        placeholder="Your name"
                        {...a11y("name")}
                    />
                    {err("name")}
                </div>
                <div>
                    <label className="field-label" htmlFor={fieldId("phone")}>
                        Mobile number
                    </label>
                    <div className="flex">
                        <span className="inline-flex min-h-[52px] items-center border-2 border-r-0 border-concrete-300 bg-concrete-50 px-3 text-[16px] font-semibold text-ink">
                            +91
                        </span>
                        <input
                            id={fieldId("phone")}
                            name="phone"
                            type="tel"
                            inputMode="numeric"
                            autoComplete="tel-national"
                            maxLength={13}
                            className="field"
                            placeholder="98765 43210"
                            {...a11y("phone")}
                        />
                    </div>
                    {err("phone")}
                </div>
            </div>

            {!listing && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                        <label
                            className="field-label"
                            htmlFor={fieldId("type")}
                        >
                            Property type
                        </label>
                        <select
                            id={fieldId("type")}
                            name="propertyType"
                            className="field"
                            defaultValue={TYPES[TYPES.length - 1]}
                        >
                            {TYPES.map((t) => (
                                <option key={t}>{t}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label
                            className="field-label"
                            htmlFor={fieldId("area")}
                        >
                            Preferred area
                        </label>
                        <select
                            id={fieldId("area")}
                            name="area"
                            className="field"
                            defaultValue="Any area"
                        >
                            <option>Any area</option>
                            {AREAS.map((a) => (
                                <option key={a.slug}>{a.name}</option>
                            ))}
                            <option>Somewhere else</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2">
                        <label
                            className="field-label"
                            htmlFor={fieldId("budget")}
                        >
                            Budget or size{" "}
                            <span className="font-medium text-slate-500">
                                (optional)
                            </span>
                        </label>
                        <input
                            id={fieldId("budget")}
                            name="budget"
                            type="text"
                            className="field"
                            placeholder="For example, ₹1.5 Cr, ₹80,000 per month or 20,000 sq ft"
                        />
                    </div>
                </div>
            )}

            {listing && (
                <div className="mt-4">
                    <label className="field-label" htmlFor={fieldId("visit")}>
                        When would you like to visit?
                    </label>
                    <select
                        id={fieldId("visit")}
                        name="visit"
                        className="field"
                        defaultValue={VISITS[0]}
                    >
                        {VISITS.map((v) => (
                            <option key={v}>{v}</option>
                        ))}
                    </select>
                </div>
            )}

            <div className="mt-4">
                <label className="field-label" htmlFor={fieldId("email")}>
                    Email{" "}
                    <span className="font-medium text-slate-500">
                        (optional)
                    </span>
                </label>
                <input
                    id={fieldId("email")}
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="field"
                    placeholder="you@example.com"
                    {...a11y("email")}
                />
                {err("email")}
            </div>

            <div className="mt-4">
                <label className="field-label" htmlFor={fieldId("message")}>
                    Message{" "}
                    <span className="font-medium text-slate-500">
                        (optional)
                    </span>
                </label>
                <textarea
                    id={fieldId("message")}
                    name="message"
                    rows={compact ? 3 : 4}
                    className="field"
                    placeholder={
                        listing
                            ? `I'd like to know more about ${listing.name}.`
                            : "Tell us what you are looking for: size, area, timeline."
                    }
                />
            </div>

            {/* honeypot: real users never see or fill this */}
            <div
                aria-hidden
                className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
            >
                <label>
                    Website
                    <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                    />
                </label>
            </div>

            <div className="mt-5">
                <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-slate-600">
                    <input
                        type="checkbox"
                        name="consent"
                        className="mt-0.5 h-[20px] w-[20px] shrink-0 accent-[#B4131E]"
                        {...a11y("consent")}
                    />
                    <span>
                        I agree to be contacted about this enquiry by phone,
                        WhatsApp or email. See our{" "}
                        <Link href="/privacy-policy">
                            <a className="link-quiet text-ink">
                                privacy policy
                            </a>
                        </Link>
                        .
                    </span>
                </label>
                {err("consent")}
            </div>

            {status === "error" && (
                <div
                    className="mt-5 border-2 border-danger bg-crimson-soft p-4 text-[15px]"
                    role="alert"
                >
                    <p className="font-semibold text-danger">{serverError}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        <a
                            href={telLink(SITE.phone)}
                            className="btn btn-outline btn-sm"
                        >
                            <PhoneIcon size={16} /> Call us
                        </a>
                        <a
                            href={waLink(
                                SITE.whatsapp,
                                "Hi, I'd like to enquire about a property.",
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp btn-sm"
                        >
                            <WhatsAppIcon size={16} /> WhatsApp
                        </a>
                    </div>
                </div>
            )}

            <button
                type="submit"
                disabled={status === "sending"}
                className="btn btn-primary btn-lg mt-6 w-full disabled:cursor-wait disabled:opacity-80"
            >
                {status === "sending" ? (
                    <>
                        <span
                            aria-hidden
                            className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white"
                        />
                        Sending
                    </>
                ) : (
                    "Request a call back"
                )}
            </button>
        </form>
    );
};
