import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SITE } from "src/config/site";
import { track } from "src/lib/analytics";
import { waLink } from "src/lib/format";
import { cloudinary } from "src/lib/properties";
import { OPEN_EVENT, useShortlist } from "src/lib/shortlist";
import { CloseIcon, HeartIcon, WhatsAppIcon } from "src/components/ui/Icons";

/** Saved listings, with one-tap "send my shortlist" over WhatsApp. */
export const ShortlistDrawer = () => {
    const { items, remove, clear } = useShortlist();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onOpen = () => setOpen(true);
        window.addEventListener(OPEN_EVENT, onOpen);
        return () => window.removeEventListener(OPEN_EVENT, onOpen);
    }, []);

    const close = useCallback(() => setOpen(false), []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };
        document.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        ref.current?.querySelector<HTMLElement>("button")?.focus();
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [open, close]);

    if (!open) return null;

    const message = [
        "Hi, I've shortlisted these properties on your website:",
        ...items.map(
            (i, n) =>
                `${n + 1}. ${i.name} (${i.ref}), ${i.priceLabel}${
                    i.priceSuffix ? ` ${i.priceSuffix}` : ""
                } - ${SITE.url}${i.path}`,
        ),
        "Please share more details and a good time to visit.",
    ].join("\n");

    return (
        <div
            className="fixed inset-0 z-[60]"
            role="dialog"
            aria-modal="true"
            aria-label="Your shortlist"
        >
            <button
                type="button"
                aria-label="Close shortlist"
                tabIndex={-1}
                onClick={close}
                className="fade-in absolute inset-0 bg-ink/70"
            />
            <div
                ref={ref}
                className="sheet-in absolute inset-y-0 right-0 flex w-full max-w-[460px] flex-col bg-white shadow-lift"
            >
                <div className="flex items-center justify-between border-b-2 border-ink px-5 py-4">
                    <h2 className="font-display text-[34px] font-extrabold uppercase leading-none">
                        Your shortlist
                    </h2>
                    <button
                        type="button"
                        onClick={close}
                        aria-label="Close shortlist"
                        className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-ink"
                    >
                        <CloseIcon size={26} />
                    </button>
                </div>

                {items.length === 0 ? (
                    <div className="flex flex-1 flex-col items-start justify-center px-6">
                        <HeartIcon size={34} className="text-crimson" />
                        <p className="mt-4 font-display text-[40px] font-extrabold uppercase leading-[0.95] text-ink">
                            Nothing saved yet
                        </p>
                        <p className="mt-3 max-w-[32ch] text-[16px] text-slate-600">
                            Tap the heart on any listing to keep it here, then
                            send the whole list to us in one message.
                        </p>
                        <Link href="/properties">
                            <a onClick={close} className="btn btn-dark mt-6">
                                Browse properties
                            </a>
                        </Link>
                    </div>
                ) : (
                    <>
                        <ul className="flex-1 divide-y divide-concrete-200 overflow-y-auto">
                            {items.map((i) => (
                                <li key={i.id} className="flex gap-4 p-5">
                                    <div className="h-[84px] w-[112px] shrink-0 bg-concrete">
                                        {i.cover && (
                                            <img
                                                src={cloudinary(
                                                    i.cover,
                                                    224,
                                                    168,
                                                )}
                                                alt=""
                                                width={112}
                                                height={84}
                                                className="h-full w-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="tnum text-[13px] font-semibold text-slate-500">
                                            {i.ref} · {i.dealLabel}
                                        </p>
                                        <Link href={i.path}>
                                            <a
                                                onClick={close}
                                                className="block truncate font-semibold text-ink hover:text-crimson"
                                            >
                                                {i.name}
                                            </a>
                                        </Link>
                                        <p className="tnum font-display text-[26px] font-extrabold leading-tight text-ink">
                                            {i.priceLabel}
                                            {i.priceSuffix && (
                                                <span className="ml-1 font-sans text-[14px] font-semibold text-slate-500">
                                                    {i.priceSuffix}
                                                </span>
                                            )}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => remove(i.id)}
                                            className="text-[14px] font-semibold text-slate-500 underline underline-offset-4 hover:text-crimson"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="safe-bottom space-y-3 border-t-2 border-ink p-5">
                            <a
                                href={waLink(SITE.whatsapp, message)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() =>
                                    track("Contact", {
                                        channel: "whatsapp",
                                        location: "shortlist",
                                        content_ids: items.map((x) => x.id),
                                    })
                                }
                                className="btn btn-whatsapp btn-lg w-full"
                            >
                                <WhatsAppIcon size={22} /> Send shortlist
                            </a>
                            <button
                                type="button"
                                onClick={clear}
                                className="w-full text-center text-[14px] font-semibold text-slate-500 underline underline-offset-4 hover:text-crimson"
                            >
                                Clear all
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
