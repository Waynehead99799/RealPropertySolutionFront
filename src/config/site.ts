/**
 * Single source of truth for everything the business owns:
 * name, address, phone, socials, tracking IDs and editorial lists.
 * Edit here, not inside components.
 *
 * Anything marked CLIENT-TO-CONFIRM is intentionally empty/hidden until the
 * client supplies a verified value (see the audit brief, sections 3 and 4).
 */

const env = process.env.NEXT_ENV || "production";

/**
 * Production builds are indexable by default, whatever NEXT_ENV is set to on
 * the host. Search engines are kept out only when the site is explicitly
 * closed (NEXT_ENV=local|staging, or NEXT_PUBLIC_NOINDEX=true) or when running
 * the dev server.
 */
export const ALLOW_INDEXING =
    process.env.NODE_ENV === "production" &&
    !["local", "staging"].includes(env) &&
    process.env.NEXT_PUBLIC_NOINDEX !== "true";

export const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.realpropertysolution.in"
).replace(/\/$/, "");

export const API_BASE = (
    process.env.NEXT_API_ENDPOINT ||
    "https://real-property-solution-back.vercel.app/api"
).replace(/\/$/, "");

export const SITE = {
    name: "Real Property Solution",
    url: SITE_URL,
    locale: "en-IN",
    tagline: "Offices, warehouses, homes and plots in Ahmedabad",
    description:
        "Offices, shops, warehouses, flats and plots in Ahmedabad with real prices. Talk to Mehul's team on WhatsApp about SG Highway, Bodakdev, Thaltej and warehouse listings.",

    phone: "+919909953645",
    phoneDisplay: "+91 99099 53645",
    whatsapp: "919909953645",
    // CLIENT-TO-CONFIRM: swap for info@realpropertysolution.in once the mailbox exists.
    email: "realpropertysolution31@gmail.com",

    address: {
        line1: "921, Gala Empire, Opp. Doordarshan Tower",
        line2: "Nr. Drive In Road, Thaltej",
        city: "Ahmedabad",
        region: "Gujarat",
        postalCode: "380054",
        country: "IN",
    },

    // CLIENT-TO-CONFIRM: RERA registration number. Hidden while empty.
    rera: "",
    // CLIENT-TO-CONFIRM: office hours, e.g. "Mon-Sat, 10 am to 7 pm". Hidden while empty.
    hours: "",

    social: {
        instagram: "https://www.instagram.com/real_property_solution/",
        facebook:
            "https://www.facebook.com/p/Real-Property-Solution-100054285771240/",
    },

    // CLIENT-TO-CONFIRM: add Google Business Profile review link once claimed.
    googleReviewUrl: "",

    // CLIENT-TO-CONFIRM: genuine, consented client reviews. Section is hidden while empty.
    testimonials: [] as {
        name: string;
        role: string;
        area: string;
        quote: string;
        photo?: string;
        url?: string;
    }[],

    // CLIENT-TO-CONFIRM: figures the client can defend. Shown only when set.
    stats: {
        yearsInBusiness: 0,
        dealsClosed: 0,
    },

    /** Developers shown on the client's own Instagram highlights. */
    developers: [
        "Sobha",
        "Adani Realty",
        "Suryam Group",
        "Arvind SmartSpaces",
        "Shaligram",
        "True Value",
        "Palak Group",
        "Rashmi",
        "Shivalik Group",
        "Pravish Group",
    ],

    tracking: {
        gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
        ga4Id: process.env.NEXT_PUBLIC_GA4_ID || "",
        metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
    },
};

export const SITE_ADDRESS_ONE_LINE = `${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`;

export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
    `Gala Empire, Drive In Road, Thaltej, Ahmedabad 380054`,
)}&output=embed`;
export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `Gala Empire, Drive In Road, Thaltej, Ahmedabad 380054`,
)}`;

export const NAV = [
    { label: "Commercial", href: "/commercial" },
    { label: "Warehouses", href: "/warehouse" },
    { label: "Residential", href: "/residential" },
    { label: "Plots", href: "/land" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export const CATEGORIES = {
    commercial: {
        key: "commercial",
        label: "Commercial",
        heading: "Offices, shops and showrooms",
        blurb: "Offices, shops and showrooms to lease or buy in Ahmedabad, including pre-leased investments on SG Highway, in Bodakdev and on Sindhu Bhavan Road.",
        title: "Commercial Property in Ahmedabad: Offices, Shops, Showrooms",
        description:
            "Offices, shops and showrooms for sale and rent in Ahmedabad. Real prices, price per sq ft and photos across SG Highway, Bodakdev and Sindhu Bhavan Road.",
    },
    warehouse: {
        key: "warehouse",
        label: "Warehouses",
        heading: "Warehouses and industrial sheds",
        blurb: "Warehouses, godowns and industrial sheds for lease and sale around Aslali, Bareja and Kheda, with the size, location and rate shared up front.",
        title: "Warehouse for Rent and Sale in Ahmedabad",
        description:
            "Warehouses, godowns and industrial sheds for lease and sale around Ahmedabad: Aslali, Bareja, Kheda and Hariyala. Talk to Real Property Solution.",
    },
    residential: {
        key: "residential",
        label: "Residential",
        heading: "Flats and bungalows",
        blurb: "Flats, apartments and bungalows to buy or rent in Ahmedabad's established and emerging neighbourhoods, including new projects.",
        title: "Flats & Bungalows in Ahmedabad",
        description:
            "Flats, apartments and bungalows for sale and rent in Ahmedabad. Verified listings with real prices from Real Property Solution.",
    },
    land: {
        key: "land",
        label: "Plots",
        heading: "Plots and land",
        blurb: "Residential and investment plots in and around Ahmedabad, with plot size, price and exact location.",
        title: "Plots & Land for Sale in Ahmedabad",
        description:
            "Residential plots and land for sale in and around Ahmedabad, with plot size, price per sq ft and location.",
    },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;
export const CATEGORY_KEYS = Object.keys(CATEGORIES) as CategoryKey[];

/** Micro-markets. Copy stays factual and general on purpose. */
export const AREAS: {
    slug: string;
    name: string;
    match: RegExp;
    intro: string;
    detail: string;
}[] = [
    {
        slug: "sg-highway",
        name: "SG Highway",
        match: /\b(s\.?\s?g\.?\s?highway|sarkhej|makarba|makrba|wetgate|westgate)\b/i,
        intro: "Ahmedabad's main commercial corridor, lined with office towers, showrooms and corporate campuses.",
        detail: "Sarkhej-Gandhinagar Highway, from Thaltej through Makarba, is Ahmedabad's best-known business corridor. Tenants choose it for road access, parking and the number of neighbouring businesses. We list offices here for both lease and outright purchase, including pre-leased options for investors.",
    },
    {
        slug: "bodakdev",
        name: "Bodakdev",
        match: /\bbodakdev\b/i,
        intro: "A central-west locality that mixes premium offices, retail frontage and high-end homes.",
        detail: "Bodakdev, around Sandesh Press Road and Judges Bungalow Road, is one of Ahmedabad's most sought-after addresses for professionals' offices and premium residences. We handle office sales, rentals and pre-leased commercial units here.",
    },
    {
        slug: "sindhu-bhavan-road",
        name: "Sindhu Bhavan Road",
        match: /\bsindhu\s?bhavan\b/i,
        intro: "A premium commercial and retail strip with furnished offices and showrooms.",
        detail: "Sindhu Bhavan Road is known for boutique offices, showrooms and hospitality. Furnished, ready-to-use offices suit teams that want to start without a fit-out.",
    },
    {
        slug: "thaltej",
        name: "Thaltej",
        match: /\b(thaltej|drive[\s-]?in)\b/i,
        intro: "Our home neighbourhood: offices, residential societies and quick access to SG Highway.",
        detail: "Thaltej sits between the Drive-In Road belt and SG Highway, which makes it practical for both commercial and residential buyers. Our office is here, so site visits in the area are easy to arrange.",
    },
    {
        slug: "prahlad-nagar",
        name: "Prahlad Nagar",
        match: /\bprahlad\s?nagar\b/i,
        intro: "An established business and residential hub with large commercial towers.",
        detail: "Prahlad Nagar combines corporate offices, retail and well-developed residential neighbourhoods. Tell us your requirement and we will shortlist what is available.",
    },
    {
        slug: "shilaj",
        name: "Shilaj",
        match: /\bshilaj\b/i,
        intro: "A fast-growing western belt for plots, bungalows and new residential projects.",
        detail: "Shilaj is popular with buyers looking for plots and bungalow-style homes on the western edge of the city. Ask us for current plot sizes and prices.",
    },
    {
        slug: "aslali",
        name: "Aslali",
        match: /\baslali\b/i,
        intro: "A warehousing and industrial belt on the south-eastern edge of Ahmedabad.",
        detail: "Aslali is one of the locations we most often list warehouses and industrial sheds in. Ask us for the sizes available, whether there is office space and staff quarters on site, and the current rate.",
    },
    {
        slug: "bareja",
        name: "Bareja",
        match: /\bbareja\b/i,
        intro: "Industrial sheds and godowns on Ahmedabad's outskirts.",
        detail: "Bareja is another warehouse location we work in. Tell us the size you need and how soon, and we will share what is available for lease or sale.",
    },
    {
        slug: "kheda",
        name: "Kheda and Hariyala",
        match: /\b(kheda|hariyala|kanera|jetalpur)\b/i,
        intro: "Large-format warehouse space in Kheda district.",
        detail: "For bigger requirements we list warehouse space around Kheda and Hariyala, including larger plots for sheds. Share your size range and we will come back with options.",
    },
    {
        slug: "science-city",
        name: "Science City",
        match: /\b(science\s?(city|park)|sola|ring\s?road)\b/i,
        intro: "Residential projects close to the SP Ring Road and Science City Road.",
        detail: "The Science City and SP Ring Road belt has many new apartment projects. We help you compare projects, layouts and pricing before you visit.",
    },
];

export const FAQS = [
    {
        q: "What is a pre-leased office, and why do investors buy one?",
        a: "A pre-leased office is sold with a tenant already paying rent under a lease. The buyer starts earning rental income from day one. Ask us for the tenant type, lease term and current rent so you can work out the yield before you visit.",
    },
    {
        q: "Do you handle both buying and renting?",
        a: "Yes. We list offices, shops, showrooms, flats, bungalows and plots for sale, and offices and shops for lease. Tell us whether you are buying, leasing or listing your own property and we will take it from there.",
    },
    {
        q: "Do you handle warehouses and industrial sheds?",
        a: "Yes. We list warehouses, godowns and industrial sheds for lease and sale around Aslali, Bareja and Kheda. Tell us the size, location and when you need it, and we will share matching options.",
    },
    {
        q: "How do I list my property with you?",
        a: "Use the 'List your property' form or WhatsApp us the location, size and expected price or rent. We will confirm the details and get it listed.",
    },
    {
        q: "Are the prices on the site final?",
        a: "Prices are the owner's or developer's asking prices at the time of listing. Final terms are agreed between buyer and owner, and we help with the negotiation.",
    },
    {
        q: "Do you also deal in new projects?",
        a: "Yes. We work with a number of Ahmedabad developers on new residential and commercial projects. Ask us about what is currently open for booking.",
    },
];

/**
 * Paid-traffic landing pages (/lp/<slug>). One job each: one headline, a few
 * matching listings, a short form and a WhatsApp button. No main navigation.
 * `match` picks listings; if nothing matches, the page falls back to all
 * commercial listings so an ad click never lands on an empty page.
 */
export const LANDING_PAGES: Record<
    string,
    {
        title: string;
        description: string;
        headline: string;
        sub: string;
        points: string[];
        match: {
            areaKey?: string;
            category?: CategoryKey;
            preLeased?: boolean;
        };
        wa: string;
    }
> = {
    "office-space-sg-highway": {
        title: "Office Space on SG Highway, Ahmedabad",
        description:
            "Offices for rent and sale on SG Highway, Ahmedabad. See price, size and photos, then talk to us on WhatsApp.",
        headline: "Office space on SG Highway, Ahmedabad",
        sub: "Ready-to-use and unfurnished offices in SG Highway's business corridor, with the price and the price per sq ft shown up front.",
        points: [
            "Price and price per sq ft on every listing",
            "Furnished and unfurnished options",
            "Site visits arranged quickly",
        ],
        match: { areaKey: "sg-highway", category: "commercial" },
        wa: "Hi, I'm looking for office space on SG Highway, Ahmedabad.",
    },
    "pre-leased-offices-bodakdev": {
        title: "Pre-leased Offices in Bodakdev, Ahmedabad",
        description:
            "Pre-leased office space for sale in Bodakdev, Ahmedabad. Rent-earning commercial property with price per sq ft shown.",
        headline: "Pre-leased offices in Bodakdev",
        sub: "Buy an office that already has a tenant and start earning rent from day one. Ask us for tenant type, lease term and current rent.",
        points: [
            "Rent-earning commercial property",
            "Price and price per sq ft shown",
            "Tenant and lease details on request",
        ],
        match: { areaKey: "bodakdev", category: "commercial", preLeased: true },
        wa: "Hi, I'm interested in pre-leased offices in Bodakdev, Ahmedabad.",
    },
    "warehouse-for-rent-ahmedabad": {
        title: "Warehouse for Rent in Ahmedabad",
        description:
            "Warehouses and industrial sheds for rent and sale around Ahmedabad: Aslali, Bareja and Kheda. Share your size and we will call you back.",
        headline: "Warehouse for rent in Ahmedabad",
        sub: "Warehouses and industrial sheds around Aslali, Bareja and Kheda. Tell us the size you need and we will share what is available.",
        points: [
            "Aslali, Bareja, Kheda and Hariyala",
            "Smaller and large-format sizes",
            "Rates and site details shared up front",
        ],
        match: { category: "warehouse" },
        wa: "Hi, I'm looking for a warehouse on rent around Ahmedabad.",
    },
};

/** Third-party photography used on the site. Shown at /photo-credits as the licence requires. */
export const PHOTO_CREDITS = [
    {
        title: "Paddy stored in warehouse",
        author: "Ganesh Dhamodkar",
        license: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
        source: "https://commons.wikimedia.org/wiki/File:Paddy_stored_in_warehouse.jpg",
        use: "Warehouses tile and page header, Aslali and Bareja page headers, warehouse landing page",
    },
    {
        title: "Ashiana Brahmanand, Jamshedpur 01",
        author: "Ank Kumar",
        license: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
        source: "https://commons.wikimedia.org/wiki/File:Ashiana_Brahmanand_,_Jamshedpur_-_Ank_Kumar_01.jpg",
        use: "Residential tile",
    },
    {
        title: "Gurgoan3",
        author: "Pithwilds",
        license: "CC BY-SA 3.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
        source: "https://commons.wikimedia.org/wiki/File:Gurgoan3.JPG",
        use: "Residential page header",
    },
    {
        title: "Flight above Ahmedabad city (3)",
        author: "Gannu03",
        license: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
        source: "https://commons.wikimedia.org/wiki/File:Flight_above_Ahmedabad_city_3.jpg",
        use: "Home page hero, Science City page",
    },
    {
        title: "Flight above Ahmedabad city (4)",
        author: "Gannu03",
        license: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
        source: "https://commons.wikimedia.org/wiki/File:Flight_above_Ahmedabad_city_4.jpg",
        use: "404 page",
    },
    {
        title: "Flight above Ahmedabad city (5)",
        author: "Gannu03",
        license: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
        source: "https://commons.wikimedia.org/wiki/File:Flight_above_Ahmedabad_city_5.jpg",
        use: "Plots and land",
    },
    {
        title: "Flight above Ahmedabad city",
        author: "Gannu03",
        license: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
        source: "https://commons.wikimedia.org/wiki/File:Flight_above_Ahmedabad_city.jpg",
        use: "About, Shilaj",
    },
    {
        title: "Flight above Ahmedabad city (2)",
        author: "Gannu03",
        license: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
        source: "https://commons.wikimedia.org/wiki/File:Flight_above_Ahmedabad_city_2.jpg",
        use: "Plots tile and page header, Kheda and Hariyala page header",
    },
    {
        title: "Aerial shot of Ahmedabad city, the Sabarmati river, and bridges",
        author: "Brihaspati",
        license: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
        source: "https://commons.wikimedia.org/wiki/File:Aerial_shot_of_Ahmedabad_city,_the_Sabarmati_river,_and_bridges.jpg",
        use: "Portfolio, Contact and Prahlad Nagar page headers",
    },
    {
        title: "SG Highway Skyline",
        author: "Kushagra140",
        license: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
        source: "https://commons.wikimedia.org/wiki/File:SG_Highway_Skyline.jpg",
        use: "Commercial and SG Highway",
    },
];
