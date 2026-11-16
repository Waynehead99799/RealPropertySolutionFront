import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { SITE } from "src/config/site";
import { track } from "src/lib/analytics";
import { telLink, waLink } from "src/lib/format";
import { CloseIcon, PhoneIcon, WhatsAppIcon } from "src/components/ui/Icons";

const GENERAL = [
    "I'm looking for an office or shop",
    "I need a warehouse",
    "I want to buy a flat or plot",
    "I want to list my property",
];
const ABOUT_LISTING = [
    "Is it still available?",
    "What is the best price?",
    "Can I visit this week?",
    "Please share more photos",
];

/**
 * "Ask us" board, bottom right on desktop. Each question opens WhatsApp with
 * the message already written, so a visitor can ask in one tap.
 */
export const AskWidget = ({ context }: { context?: string }) => {
    const [open, setOpen] = useState(false);
    const [shown, setShown] = useState(false);
    const panel = useRef<HTMLDivElement>(null);
    const questions = context ? ABOUT_LISTING : GENERAL;

    // Stay out of the way of the hero buttons until the visitor has scrolled.
    useEffect(() => {
        const onScroll = () => setShown(window.scrollY > 520);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

    return (
        <div
            className={`fixed bottom-6 right-6 z-30 hidden transition-[opacity,transform] duration-300 lg:block ${
                shown || open
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-4 opacity-0"
            }`}
        >
            {open && (
                <div
                    ref={panel}
                    role="dialog"
                    aria-label="Ask us a question"
                    className="pop-in absolute bottom-[72px] right-0 w-[360px] origin-bottom-right border-2 border-ink bg-white shadow-lift"
                >
                    <div className="flex items-center justify-between bg-crimson px-5 py-3 text-white">
                        <p className="font-display text-[28px] font-extrabold uppercase leading-none">
                            Ask us
                        </p>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label="Close"
                            className="-mr-2 inline-flex h-10 w-10 items-center justify-center"
                        >
                            <CloseIcon size={22} />
                        </button>
                    </div>
                    <div className="p-5">
                        <p className="text-[15px] text-slate-600">
                            {context
                                ? `About ${context}. Tap a question and it opens in WhatsApp.`
                                : "Tap a question and it opens in WhatsApp, already written."}
                        </p>
                        <ul className="mt-4 space-y-2">
                            {questions.map((q) => (
                                <li key={q}>
                                    <a
                                        href={waLink(
                                            SITE.whatsapp,
                                            context ? `${context}: ${q}` : q,
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() =>
                                            track("Contact", {
                                                channel: "whatsapp",
                                                location: "ask-widget",
                                            })
                                        }
                                        className="flex min-h-[46px] items-center justify-between gap-3 border-2 border-concrete-300 px-3.5 text-[16px] font-semibold text-ink transition-colors hover:border-ink hover:bg-concrete-50"
                                    >
                                        {q}
                                        <WhatsAppIcon
                                            size={18}
                                            className="shrink-0 text-whatsapp"
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                            <a
                                href={telLink(SITE.phone)}
                                onClick={() =>
                                    track("Contact", {
                                        channel: "call",
                                        location: "ask-widget",
                                    })
                                }
                                className="btn btn-outline btn-sm"
                            >
                                <PhoneIcon size={16} /> Call
                            </a>
                            <Link href="/contact#enquire">
                                <a
                                    onClick={() => setOpen(false)}
                                    className="btn btn-dark btn-sm"
                                >
                                    Call me back
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                className="relative flex h-14 items-center gap-3 bg-crimson px-5 font-display text-[22px] font-extrabold uppercase tracking-[0.06em] text-white shadow-lift transition-colors hover:bg-crimson-dark active:scale-[0.98]"
            >
                {!open && (
                    <span
                        aria-hidden
                        className="ring absolute inset-0 bg-crimson"
                    />
                )}
                <WhatsAppIcon size={22} className="relative" />
                <span className="relative">Ask us</span>
            </button>
        </div>
    );
};
