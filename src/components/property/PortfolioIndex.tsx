import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES, CATEGORY_KEYS, CategoryKey } from "src/config/site";
import { track } from "src/lib/analytics";
import { formatNumber } from "src/lib/format";
import {
    BUDGETS,
    Listing,
    ListingFilters,
    areasInUse,
    cloudinary,
    filterListings,
} from "src/lib/properties";
import { useShortlist } from "src/lib/shortlist";
import { WhatsAppIcon } from "src/components/ui/Icons";
import { Photo } from "src/components/ui/Photo";
import { TILE_FOR_CATEGORY } from "src/lib/photos";
import { SITE } from "src/config/site";
import { waLink } from "src/lib/format";
import { PropertyCard } from "./PropertyCard";

interface Props {
    listings: Listing[];
    /** Category pages lock the category. */
    fixedCategory?: CategoryKey;
    /** Area pages lock the area. */
    fixedArea?: string;
}

type Deal = "" | "sale" | "rent";
type View = "gallery" | "index";
type State = ListingFilters & { savedOnly?: boolean; view?: View };

const SORTS = [
    { v: "new", l: "Newest first" },
    { v: "price-asc", l: "Price, low to high" },
    { v: "price-desc", l: "Price, high to low" },
    { v: "size-desc", l: "Size, large to small" },
];

const str = (v: string | string[] | undefined) =>
    (Array.isArray(v) ? v[0] : v) || "";

const Pill = ({
    active,
    children,
    onClick,
}: {
    active: boolean;
    children: React.ReactNode;
    onClick: () => void;
}) => (
    <button
        type="button"
        aria-pressed={active}
        onClick={onClick}
        className={`min-h-[46px] whitespace-nowrap border-2 px-4 font-display text-[20px] font-extrabold uppercase tracking-[0.05em] transition-colors duration-150 ${
            active
                ? "border-ink bg-ink text-white"
                : "border-concrete-300 bg-white text-ink hover:border-ink"
        }`}
    >
        {children}
    </button>
);

export const EmptyState = ({
    title,
    category,
}: {
    title: string;
    category?: CategoryKey;
}) => (
    <div className="mt-10 grid items-center gap-8 border-2 border-ink p-8 md:grid-cols-[260px_1fr] md:p-12">
        <div className="crop">
            <div className="relative aspect-[4/3] bg-ink">
                <Photo
                    name={TILE_FOR_CATEGORY[category || "commercial"]}
                    sizes="260px"
                    className="h-full w-full object-cover"
                />
            </div>
        </div>
        <div>
            <h3 className="font-display text-[44px] font-extrabold uppercase leading-[0.95] text-ink">
                {title}
            </h3>
            <p className="mt-3 max-w-[48ch] text-[17px] text-slate-600">
                Tell us what you need on WhatsApp and we will send you matching
                options, including ones not yet listed here.
            </p>
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
                        location: "empty-state",
                    })
                }
                className="btn btn-whatsapp mt-6"
            >
                <WhatsAppIcon size={20} /> Share your requirement
            </a>
        </div>
    </div>
);

export const PortfolioIndex = ({
    listings,
    fixedCategory,
    fixedArea,
}: Props) => {
    const router = useRouter();
    const { items: saved } = useShortlist();
    const [f, setF] = useState<State>({ sort: "new", view: "gallery" });
    const [showFilters, setShowFilters] = useState(false);
    const hydrated = useRef(false);

    useEffect(() => {
        if (!router.isReady) return;
        const q = router.query;
        const deal = str(q.deal);
        setF({
            deal: deal === "sale" || deal === "rent" ? deal : "",
            category: fixedCategory || (str(q.category) as CategoryKey) || "",
            area: fixedArea || str(q.area),
            min: Number(str(q.min)) || 0,
            max: Number(str(q.max)) || 0,
            furnishing: str(q.furnishing),
            q: str(q.q),
            sort: (str(q.sort) as ListingFilters["sort"]) || "new",
            savedOnly: str(q.saved) === "1",
            view: str(q.view) === "index" ? "index" : "gallery",
        });
        hydrated.current = true;
    }, [router.isReady]);

    /** Shallow URL update that also works on dynamic routes. */
    const replaceQuery = (query: Record<string, string>) => {
        const base = router.asPath.split("?")[0].split("#")[0];
        const qs = new URLSearchParams(query).toString();
        router.replace(qs ? `${base}?${qs}` : base, undefined, {
            shallow: true,
            scroll: false,
        });
    };

    const update = (patch: Partial<State>) => {
        const next = { ...f, ...patch };
        setF(next);
        const query: Record<string, string> = {};
        if (next.deal) query.deal = next.deal;
        if (!fixedCategory && next.category) query.category = next.category;
        if (!fixedArea && next.area) query.area = next.area;
        if (next.min) query.min = String(next.min);
        if (next.max) query.max = String(next.max);
        if (next.furnishing) query.furnishing = next.furnishing;
        if (next.q) query.q = next.q;
        if (next.sort && next.sort !== "new") query.sort = next.sort;
        if (next.savedOnly) query.saved = "1";
        if (next.view === "index") query.view = "index";
        replaceQuery(query);
    };

    const savedIds = useMemo(() => saved.map((s) => s.id), [saved]);
    const results = useMemo(() => {
        const base = filterListings(listings, {
            ...f,
            category: fixedCategory || f.category,
            area: fixedArea || f.area,
        });
        return f.savedOnly ? base.filter((l) => savedIds.includes(l.id)) : base;
    }, [listings, f, savedIds, fixedCategory, fixedArea]);

    const lastTracked = useRef("");
    useEffect(() => {
        if (!hydrated.current) return;
        const s = JSON.stringify({
            d: f.deal,
            c: f.category,
            a: f.area,
            q: f.q,
            mn: f.min,
            mx: f.max,
        });
        if (s === lastTracked.current) return;
        lastTracked.current = s;
        if (
            !f.deal &&
            !f.q &&
            !f.area &&
            !f.min &&
            !f.max &&
            !(f.category && !fixedCategory)
        )
            return;
        const t = window.setTimeout(
            () =>
                track("Search", {
                    search_string: `${f.deal || ""} ${
                        f.category || fixedCategory || ""
                    } ${f.area || fixedArea || ""} ${f.q || ""}`.trim(),
                }),
            800,
        );
        return () => window.clearTimeout(t);
    }, [f, fixedCategory, fixedArea]);

    const areaOpts = areasInUse(listings);
    const budgets = f.deal === "rent" ? BUDGETS.rent : BUDGETS.sale;
    const budgetIdx = Math.max(
        0,
        budgets.findIndex(
            (b) => b.min === (f.min || 0) && b.max === (f.max || 0),
        ),
    );
    const cat = fixedCategory || f.category;
    const showFurnishing = cat !== "land" && cat !== "residential";
    const activeCount = [
        f.deal,
        !fixedCategory && f.category,
        !fixedArea && f.area,
        f.min || f.max,
        f.furnishing,
        f.q,
        f.savedOnly,
    ].filter(Boolean).length;

    const clear = () => {
        setF({
            sort: f.sort,
            view: f.view,
            category: fixedCategory || "",
            area: fixedArea || "",
        });
        replaceQuery(f.view === "index" ? { view: "index" } : {});
    };

    const view = f.view || "gallery";

    return (
        <div id="portfolio">
            <div className="sticky top-[72px] z-30 -mx-5 border-y-2 border-ink bg-white px-5 py-3 sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:border-2 lg:p-5">
                {/* Mobile bar */}
                <div className="flex items-center gap-2 lg:hidden">
                    <button
                        type="button"
                        onClick={() => setShowFilters((s) => !s)}
                        aria-expanded={showFilters}
                        aria-controls="filter-panel"
                        className="btn btn-outline btn-sm flex-1"
                    >
                        Filters{activeCount ? ` (${activeCount})` : ""}
                    </button>
                    <select
                        aria-label="Sort"
                        className="field !min-h-[42px] flex-1"
                        value={f.sort}
                        onChange={(e) =>
                            update({
                                sort: e.target.value as ListingFilters["sort"],
                            })
                        }
                    >
                        {SORTS.map((s) => (
                            <option key={s.v} value={s.v}>
                                {s.l}
                            </option>
                        ))}
                    </select>
                </div>

                <div
                    id="filter-panel"
                    className={`${
                        showFilters ? "block" : "hidden"
                    } mt-4 space-y-4 lg:mt-0 lg:block`}
                >
                    <div className="flex flex-wrap items-center gap-2">
                        {(
                            [
                                ["", "All"],
                                ["sale", "Buy"],
                                ["rent", "Lease"],
                            ] as [Deal, string][]
                        ).map(([v, l]) => (
                            <Pill
                                key={l}
                                active={f.deal === v}
                                onClick={() =>
                                    update({ deal: v, min: 0, max: 0 })
                                }
                            >
                                {l}
                            </Pill>
                        ))}
                        {!fixedCategory && (
                            <>
                                <span
                                    aria-hidden
                                    className="mx-1 hidden h-8 w-[2px] bg-concrete-300 sm:block"
                                />
                                <Pill
                                    active={!f.category}
                                    onClick={() => update({ category: "" })}
                                >
                                    Everything
                                </Pill>
                                {CATEGORY_KEYS.map((k) => (
                                    <Pill
                                        key={k}
                                        active={f.category === k}
                                        onClick={() => update({ category: k })}
                                    >
                                        {CATEGORIES[k].label}
                                    </Pill>
                                ))}
                            </>
                        )}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
                        {!fixedArea && (
                            <div className="lg:col-span-3">
                                <label className="field-label" htmlFor="f-area">
                                    Area
                                </label>
                                <select
                                    id="f-area"
                                    className="field"
                                    value={f.area || ""}
                                    onChange={(e) =>
                                        update({ area: e.target.value })
                                    }
                                >
                                    <option value="">All areas</option>
                                    {areaOpts.map((a) => (
                                        <option key={a.slug} value={a.slug}>
                                            {a.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div className="lg:col-span-3">
                            <label className="field-label" htmlFor="f-budget">
                                Budget
                            </label>
                            <select
                                id="f-budget"
                                className="field disabled:bg-concrete-50"
                                value={budgetIdx}
                                disabled={!f.deal}
                                onChange={(e) => {
                                    const b = budgets[Number(e.target.value)];
                                    update({ min: b.min, max: b.max });
                                }}
                            >
                                {f.deal ? (
                                    budgets.map((b, i) => (
                                        <option key={b.label} value={i}>
                                            {b.label}
                                        </option>
                                    ))
                                ) : (
                                    <option value={0}>
                                        Choose Buy or Lease first
                                    </option>
                                )}
                            </select>
                        </div>
                        {showFurnishing && (
                            <div className="lg:col-span-2">
                                <label className="field-label" htmlFor="f-furn">
                                    Furnishing
                                </label>
                                <select
                                    id="f-furn"
                                    className="field"
                                    value={f.furnishing || ""}
                                    onChange={(e) =>
                                        update({ furnishing: e.target.value })
                                    }
                                >
                                    <option value="">Any</option>
                                    <option>Fully furnished</option>
                                    <option>Semi-furnished</option>
                                    <option>Unfurnished</option>
                                </select>
                            </div>
                        )}
                        <div
                            className={
                                fixedArea
                                    ? "lg:col-span-4"
                                    : showFurnishing
                                    ? "lg:col-span-4"
                                    : "lg:col-span-6"
                            }
                        >
                            <label className="field-label" htmlFor="f-q">
                                Search by name or place
                            </label>
                            <input
                                id="f-q"
                                type="search"
                                className="field"
                                placeholder="For example, Westgate or Bodakdev"
                                value={f.q || ""}
                                onChange={(e) => update({ q: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Result bar: count, sort, view, saved */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <p
                    className="font-display text-[34px] font-extrabold uppercase leading-none text-ink"
                    role="status"
                    aria-live="polite"
                >
                    <span className="tnum">{results.length}</span>{" "}
                    {results.length === 1 ? "property" : "properties"}
                    {activeCount > 0 && (
                        <button
                            type="button"
                            onClick={clear}
                            className="ml-4 align-middle font-sans text-[14px] font-semibold normal-case text-slate-500 underline underline-offset-4 hover:text-crimson"
                        >
                            Clear filters
                        </button>
                    )}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                    <div className="hidden lg:block">
                        <label className="sr-only" htmlFor="f-sort">
                            Sort by
                        </label>
                        <select
                            id="f-sort"
                            className="field !min-h-[46px]"
                            value={f.sort}
                            onChange={(e) =>
                                update({
                                    sort: e.target
                                        .value as ListingFilters["sort"],
                                })
                            }
                        >
                            {SORTS.map((s) => (
                                <option key={s.v} value={s.v}>
                                    {s.l}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Pill
                        active={!!f.savedOnly}
                        onClick={() => update({ savedOnly: !f.savedOnly })}
                    >
                        Saved{saved.length ? ` (${saved.length})` : ""}
                    </Pill>
                    <div
                        role="group"
                        aria-label="View"
                        className="flex border-2 border-ink"
                    >
                        {(["gallery", "index"] as View[]).map((v) => (
                            <button
                                key={v}
                                type="button"
                                aria-pressed={view === v}
                                onClick={() => update({ view: v })}
                                className={`min-h-[42px] px-3 font-display text-[19px] font-extrabold uppercase tracking-[0.05em] ${
                                    view === v
                                        ? "bg-ink text-white"
                                        : "bg-white text-ink hover:bg-concrete"
                                }`}
                            >
                                {v === "gallery" ? "Gallery" : "Index"}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {results.length === 0 ? (
                <EmptyState
                    title={
                        listings.length
                            ? "Nothing matches these filters"
                            : "New listings are being added"
                    }
                    category={fixedCategory}
                />
            ) : view === "gallery" ? (
                <div className="mt-10 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                    {results.map((l, i) => (
                        <PropertyCard key={l.id} listing={l} priority={i < 3} />
                    ))}
                </div>
            ) : (
                <div className="mt-8">
                    <div className="hidden grid-cols-[132px_1.6fr_1fr_1fr_40px] gap-5 border-b-2 border-ink pb-2 text-[14px] font-semibold text-slate-500 md:grid">
                        <span>Ref</span>
                        <span>Property</span>
                        <span>Size</span>
                        <span>Price</span>
                        <span />
                    </div>
                    <ul>
                        {results.map((l) => (
                            <li
                                key={l.id}
                                className="border-b-2 border-concrete-200"
                            >
                                <Link href={l.path}>
                                    <a className="group grid grid-cols-[96px_1fr] items-center gap-x-4 gap-y-1 py-4 transition-colors hover:bg-concrete-50 md:grid-cols-[132px_1.6fr_1fr_1fr_40px] md:gap-5">
                                        <span className="relative row-span-3 h-[72px] w-[96px] overflow-hidden bg-concrete md:row-span-1 md:h-[88px] md:w-[132px]">
                                            {l.cover ? (
                                                <img
                                                    src={cloudinary(
                                                        l.cover,
                                                        264,
                                                        176,
                                                    )}
                                                    alt=""
                                                    width={132}
                                                    height={88}
                                                    loading="lazy"
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <Photo
                                                    name={
                                                        TILE_FOR_CATEGORY[
                                                            l.category
                                                        ]
                                                    }
                                                    sizes="132px"
                                                    layout={false}
                                                    className="h-full w-full object-cover"
                                                />
                                            )}
                                        </span>
                                        <span>
                                            <span className="tnum block text-[13px] font-semibold text-slate-500">
                                                {l.ref} · {l.dealLabel}
                                            </span>
                                            <span className="block font-display text-[28px] font-extrabold uppercase leading-none text-ink group-hover:text-crimson">
                                                {l.name}
                                            </span>
                                            <span className="block text-[15px] text-slate-600">
                                                {l.locality}
                                            </span>
                                        </span>
                                        <span className="tnum text-[15px] text-slate-600">
                                            {l.sqft
                                                ? `${formatNumber(
                                                      l.sqft,
                                                  )} sq ft`
                                                : l.kind}
                                        </span>
                                        <span className="tnum font-display text-[30px] font-extrabold leading-none text-ink">
                                            {l.priceLabel}
                                            {l.priceSuffix && (
                                                <span className="ml-1.5 font-sans text-[13px] font-semibold text-slate-500">
                                                    {l.priceSuffix}
                                                </span>
                                            )}
                                        </span>
                                        <span
                                            aria-hidden
                                            className="hidden text-[28px] font-bold text-ink transition-transform duration-200 group-hover:translate-x-1 md:block"
                                        >
                                            ›
                                        </span>
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
