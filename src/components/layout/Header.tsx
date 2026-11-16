import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { NAV, SITE } from "src/config/site";
import { track } from "src/lib/analytics";
import { telLink, waLink } from "src/lib/format";
import { openShortlist, useShortlist } from "src/lib/shortlist";
import {
    CloseIcon,
    HeartIcon,
    MenuIcon,
    PhoneIcon,
    WhatsAppIcon,
} from "src/components/ui/Icons";

const isActive = (path: string, href: string) =>
    href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);

export const Header = () => {
    const router = useRouter();
    const { items } = useShortlist();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const progress = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let raf = 0;
        const paint = () => {
            raf = 0;
            const max =
                document.documentElement.scrollHeight - window.innerHeight;
            if (progress.current)
                progress.current.style.transform = `scaleX(${
                    max > 0 ? Math.min(1, window.scrollY / max) : 0
                })`;
        };
        const onScroll = () => {
            setScrolled(window.scrollY > 8);
            if (!raf) raf = requestAnimationFrame(paint);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    const close = useCallback(() => {
        setOpen(false);
        toggleRef.current?.focus();
    }, []);

    useEffect(() => {
        const done = () => setOpen(false);
        router.events.on("routeChangeComplete", done);
        return () => router.events.off("routeChangeComplete", done);
    }, [router.events]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
            if (e.key === "Tab" && drawerRef.current) {
                const f = drawerRef.current.querySelectorAll<HTMLElement>(
                    "a[href], button:not([disabled])",
                );
                if (!f.length) return;
                const first = f[0];
                const last = f[f.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        drawerRef.current?.querySelector<HTMLElement>("a, button")?.focus();
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [open, close]);

    const path = router.asPath.split("?")[0].split("#")[0];

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-40 bg-white transition-shadow duration-200 ${
                    scrolled ? "shadow-[0_2px_0_#111214]" : ""
                }`}
            >
                <div className="shell flex h-[72px] items-center justify-between gap-6">
                    <Link href="/">
                        <a
                            aria-label={`${SITE.name}, home`}
                            className="block shrink-0"
                        >
                            <img
                                src="/logo.png"
                                alt={SITE.name}
                                width={137}
                                height={44}
                                className="h-[44px] w-[137px] object-contain"
                            />
                        </a>
                    </Link>

                    <nav aria-label="Primary" className="hidden lg:block">
                        <ul className="flex items-center gap-1 xl:gap-2">
                            {NAV.map((item) => {
                                const active = isActive(path, item.href);
                                return (
                                    <li key={item.href}>
                                        <Link href={item.href}>
                                            <a
                                                aria-current={
                                                    active ? "page" : undefined
                                                }
                                                className="relative block px-3 py-2 font-display text-[21px] font-extrabold uppercase tracking-[0.04em] text-ink transition-colors duration-150 hover:text-crimson"
                                            >
                                                {item.label}
                                                <span
                                                    aria-hidden
                                                    className={`absolute inset-x-3 bottom-0 h-[4px] origin-left bg-crimson transition-transform duration-200 ease-out ${
                                                        active
                                                            ? "scale-x-100"
                                                            : "scale-x-0"
                                                    }`}
                                                />
                                            </a>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <button
                            type="button"
                            onClick={openShortlist}
                            aria-label={`Shortlist, ${items.length} saved`}
                            className="relative inline-flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-crimson"
                        >
                            <HeartIcon
                                size={24}
                                fill={items.length ? "currentColor" : "none"}
                                className={items.length ? "text-crimson" : ""}
                            />
                            {items.length > 0 && (
                                <span className="absolute right-0 top-0.5 min-w-[18px] bg-ink px-1 text-center font-display text-[14px] font-extrabold leading-[18px] text-white">
                                    {items.length}
                                </span>
                            )}
                        </button>
                        <a
                            href={telLink(SITE.phone)}
                            onClick={() =>
                                track("Contact", {
                                    channel: "call",
                                    location: "header",
                                })
                            }
                            className="hidden items-center gap-2 font-display text-[22px] font-extrabold tracking-[0.03em] text-ink xl:inline-flex"
                        >
                            <PhoneIcon size={18} className="text-crimson" />
                            <span className="tnum">{SITE.phoneDisplay}</span>
                        </a>
                        <Link href="/contact">
                            <a className="btn btn-primary btn-sm hidden sm:inline-flex">
                                Enquire
                            </a>
                        </Link>
                        <button
                            ref={toggleRef}
                            type="button"
                            className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-ink lg:hidden"
                            aria-label="Open menu"
                            aria-expanded={open}
                            aria-controls="mobile-menu"
                            onClick={() => setOpen(true)}
                        >
                            <MenuIcon size={28} />
                        </button>
                    </div>
                </div>
                <div
                    ref={progress}
                    aria-hidden
                    className="absolute bottom-0 left-0 h-[4px] w-full origin-left bg-crimson"
                    style={{ transform: "scaleX(0)" }}
                />
            </header>

            {open && (
                <div
                    id="mobile-menu"
                    ref={drawerRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Menu"
                    className="drop-in fixed inset-0 z-50 flex flex-col bg-ink text-white lg:hidden"
                >
                    <div className="flex h-[72px] shrink-0 items-center justify-between px-5">
                        <img
                            src="/logo.png"
                            alt={SITE.name}
                            width={118}
                            height={38}
                            className="h-[38px] w-auto brightness-0 invert"
                        />
                        <button
                            type="button"
                            aria-label="Close menu"
                            onClick={close}
                            className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-white"
                        >
                            <CloseIcon size={28} />
                        </button>
                    </div>
                    <nav
                        aria-label="Mobile"
                        className="flex-1 overflow-y-auto px-5 pb-4 pt-2"
                    >
                        <ul>
                            {[
                                ...NAV.slice(0, 4),
                                {
                                    label: "List your property",
                                    href: "/contact?intent=list",
                                },
                                ...NAV.slice(4),
                            ].map((item, mi) => {
                                const active = isActive(
                                    path,
                                    item.href.split("?")[0],
                                );
                                return (
                                    <li
                                        key={item.href}
                                        className="rise border-b border-white/15"
                                        style={{ ["--i" as string]: mi + 2 }}
                                    >
                                        <Link href={item.href}>
                                            <a
                                                aria-current={
                                                    active ? "page" : undefined
                                                }
                                                className={`flex min-h-[64px] items-center font-display text-[44px] font-extrabold uppercase leading-none ${
                                                    active
                                                        ? "text-crimson"
                                                        : "text-white"
                                                }`}
                                            >
                                                {item.label}
                                            </a>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                    <div className="safe-bottom grid shrink-0 grid-cols-2 gap-3 p-5">
                        <a
                            href={telLink(SITE.phone)}
                            onClick={() =>
                                track("Contact", {
                                    channel: "call",
                                    location: "menu",
                                })
                            }
                            className="btn btn-white"
                        >
                            <PhoneIcon size={18} /> Call
                        </a>
                        <a
                            href={waLink(
                                SITE.whatsapp,
                                "Hi, I'm looking for a property in Ahmedabad.",
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                                track("Contact", {
                                    channel: "whatsapp",
                                    location: "menu",
                                })
                            }
                            className="btn btn-whatsapp"
                        >
                            <WhatsAppIcon size={20} /> WhatsApp
                        </a>
                    </div>
                </div>
            )}
        </>
    );
};
