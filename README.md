# Real Property Solution: website

Front end for realpropertysolution.in, an Ahmedabad property dealer (offices, shops, flats, bungalows, plots).

Next.js 12 (pages router), React 18, TypeScript, Tailwind CSS. No UI framework and no client-side state library: pages are statically generated and refreshed in the background (ISR, 60 s), so they are fast and crawlable.

## Design system ("hoarding")

The identity borrows from the To-Let / For-Sale hoardings every Indian street has: flat brand-crimson fields, square "board" tags, a ribbon of property types, and crop marks around images.

- Fonts: **Big Shoulders Display** (headlines, prices) and **Hind** (text), self-hosted in `public/fonts` and preloaded from `pages/_document.tsx`. Declared in `src/styles/globals.css`.
- Palette and type tokens: `tailwind.config.js` (white, concrete grey, ink, brand crimson, navy).
- Motion (`globals.css`): masked headline rise, crimson sheet that unveils the hero photo, scroll-lit statement text, marquee ribbon, in-view reveals, sticky stacking posters. Transform and opacity only, all disabled under `prefers-reduced-motion`.
- Functionality added in the redesign: sentence-style search, Gallery/Index portfolio views, shortlist with one-tap "Send shortlist" on WhatsApp, "Ask us" quick questions, listing reference codes (RPS-001), EMI estimator on sale listings, preferred-visit field, Warehouses category.

## Images: no blur, no stock

- `src/lib/properties.ts` reads each Cloudinary photo's real pixel size, drops duplicates and anything under 900px wide from galleries, and every URL is built with `c_limit` / `c_lfill`, so nothing is ever upscaled. Listings without a usable photo show a drawn elevation (`src/components/ui/Art.tsx`) and "Photos on request".
- Backgrounds and tiles use real aerial photographs of Ahmedabad (new apartment blocks, a warehouse cluster by the highway, plots and farmland, the Sabarmati riverfront) plus the SG Highway skyline, all openly licensed (CC BY-SA 4.0) and credited at `/photo-credits` via `PHOTO_CREDITS` in `src/config/site.ts`. Listings with no photo of their own show the matching aerial, labelled "Area view · site photos on request". `src/lib/photos.ts` maps photos to categories and areas; `scripts/process-aerials.js` and `scripts/process-photos.js` write the responsive WebP sets to `public/photos` and never upscale.
- These are stand-ins for a proper drone shoot of the client's own projects. Replace any file in `public/photos` with a client drone photo of the same name (and update the credit) and the whole site picks it up.
- To add real photography: upload the client's original photos to the listing in the admin (Cloudinary). Anything 1600px wide or more will automatically display sharp at every size.

## Run it

```bash
npm install
npm run dev      # http://localhost:3003
npm run build && npm run start
npm run lint     # eslint + type-check + prettier
```

Node 25 note: Next 12 uses a bundled `jsonwebtoken` that reads `buffer.SlowBuffer`, which Node 25 removed. The `dev`, `build` and `start` scripts preload `scripts/node-compat.js` to restore it. It is a no-op on older Node versions. Node 18 to 22 is the safest runtime for hosting.

## Environment variables

Copy `.env.example` to `.env.local` for local work. On the host set:

| Variable | Purpose |
| --- | --- |
| `NEXT_API_ENDPOINT` | Backend base URL (defaults to the current Vercel backend) |
| `NEXT_ENV` | Set to `staging` or `local` to keep a site out of Google. Leave unset in production |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, default `https://www.realpropertysolution.in` |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container (optional) |
| `NEXT_PUBLIC_GA4_ID` | GA4 measurement ID, used only when there is no GTM container |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel, used only when there is no GTM container |
| `META_PIXEL_ID`, `META_CAPI_TOKEN` | Server-side Conversions API for Lead events (optional) |

Search engines are blocked automatically on `next dev` and when `NEXT_ENV` is `local` or `staging`. A normal production build is indexable. `robots.txt` and `sitemap.xml` are generated per environment.

## Where things live

- `src/config/site.ts`: everything the business owns (phone, address, socials, developers, areas, FAQs, landing pages, tracking IDs). Edit content here.
- `src/lib/properties.ts`: fetches listings from the backend and cleans them (typos, ALL-CAPS, plot reclassified to Land, slugs, price per sq ft).
- `src/lib/format.ts`: Indian price formatting (₹ Cr / Lakh / per month).
- `pages/api/lead.ts`: enquiry endpoint (validation, honeypot, rate limit, forwards to the backend mailer, optional Meta Conversions API).
- `src/components/`: `layout` (header, footer, ask widget, shortlist drawer), `home`, `property` (card, poster, portfolio index, gallery, EMI), `forms`, `seo`, `ui` (marquee, word reveal, art, icons).
- `pages/lp/[slug].tsx`: ad landing pages, configured in `LANDING_PAGES`.

URLs: `/`, `/properties`, `/commercial`, `/warehouse`, `/residential`, `/land`, `/<category>/<listing-slug>`, `/areas/<area>`, `/lp/<campaign>`, `/about`, `/contact`, `/thank-you`. Old `/property-detail/<id>` links redirect permanently to the new slug.

## Tracking

Nothing loads until an ID is configured and the visitor accepts the cookie notice. Events: `PageView`, `ViewContent` (listing opens), `Search`, `Lead` (form success, with a shared `event_id` for de-duplication), `Contact` (call or WhatsApp tap). UTM and click IDs are stored on first visit and sent with every lead.

## Content the client still needs to confirm

These are intentionally empty or hidden until a verified value is supplied in `src/config/site.ts`:

- RERA registration number (`rera`)
- Office hours (`hours`)
- Domain email such as info@realpropertysolution.in (`email`, currently the Gmail already shown on the old Contact page)
- Genuine, consented client reviews (`testimonials`, section stays hidden while empty)
- Figures the client can defend (`stats.yearsInBusiness`, `stats.dealsClosed`)
- Google Business Profile review link (`googleReviewUrl`)
- Permission to name the developers listed in `developers` (taken from the client's own Instagram highlights)
- Real photos: each listing, the Thaltej office, and a half-day Ahmedabad shoot. Listings without photos show a "Site photos on request" placeholder, never stock imagery.

## Backend data to fix in the admin

The site cleans these on display, but the source records should be corrected: listing "Residential Land / Plot in Ahmedabad" is filed as Residential with area "isckon / ambli road" while its address is Rethal, Sanand; the plot has amenities such as "Swimming pool"; every office lists "Garden"; agent roles are "Admin" / "Agent".
