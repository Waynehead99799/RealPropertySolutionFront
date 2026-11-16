import { CategoryKey } from "src/config/site";

/**
 * Site photography in public/photos (see scripts/process-*.js).
 * Every file is a real photograph of Ahmedabad or its surroundings and is
 * only ever written at sizes up to its native width, so nothing is stretched.
 */
export type PhotoKey =
    | "sg-highway"
    | "aero-residential"
    | "aero-warehouse"
    | "aero-plots"
    | "aero-society"
    | "aero-farmland"
    | "aero-sabarmati"
    | "tile-commercial"
    | "tile-warehouse"
    | "tile-residential"
    | "tile-plots"
    | "banner-warehouse"
    | "banner-residential"
    | "banner-plots";

const WIDTHS: Record<PhotoKey, number[]> = {
    "sg-highway": [640, 1280, 1920, 2560],
    "aero-residential": [640, 1280, 1920, 2560],
    "aero-warehouse": [640, 1280, 1920, 2560],
    "aero-plots": [640, 1280, 1920, 2560],
    "aero-society": [640, 1280, 1920, 2560],
    "aero-farmland": [640, 1280, 1920, 2560],
    "aero-sabarmati": [640, 1280, 1920],
    "tile-commercial": [640, 1000],
    "tile-warehouse": [640, 1000],
    "tile-residential": [640, 1000],
    "tile-plots": [640, 1000],
    "banner-warehouse": [1280, 1920, 2560],
    "banner-residential": [1280, 1920, 2560],
    "banner-plots": [1280, 1920, 2560],
};

export const photoSrc = (k: PhotoKey, w: number): string =>
    `/photos/${k}-${w}.webp`;

export const photoSrcSet = (k: PhotoKey): string =>
    WIDTHS[k].map((w) => `${photoSrc(k, w)} ${w}w`).join(", ");

export const photoMaxWidth = (k: PhotoKey): number =>
    WIDTHS[k][WIDTHS[k].length - 1];

/** Which photograph stands for each category when a listing has no photo of its own. */
export const PHOTO_FOR_CATEGORY: Record<CategoryKey, PhotoKey> = {
    commercial: "sg-highway",
    warehouse: "banner-warehouse",
    residential: "banner-residential",
    land: "banner-plots",
};

/** Photos that get the drawn plot-layout (boundary lines, numbered plots) on top. */
export const PLOT_LAYOUT_PHOTOS: Partial<Record<PhotoKey, "tile" | "banner">> =
    {
        "tile-plots": "tile",
        "banner-plots": "banner",
    };

/** Photograph for an area page. */
export const PHOTO_FOR_AREA: Record<string, PhotoKey> = {
    "sg-highway": "sg-highway",
    bodakdev: "sg-highway",
    "sindhu-bhavan-road": "sg-highway",
    thaltej: "sg-highway",
    "prahlad-nagar": "aero-sabarmati",
    shilaj: "aero-society",
    "science-city": "aero-residential",
    aslali: "banner-warehouse",
    bareja: "banner-warehouse",
    kheda: "aero-farmland",
};

/** Position that keeps the interesting part of each photo in frame when cropped. */
export const PHOTO_POSITION: Partial<Record<PhotoKey, string>> = {
    "sg-highway": "82% 62%",
    "aero-society": "70% 50%",
    "aero-sabarmati": "50% 60%",
};

/** 4:3 close-up that clearly shows each kind of property (tiles, cards, empty states). */
export const TILE_FOR_CATEGORY: Record<CategoryKey, PhotoKey> = {
    commercial: "tile-commercial",
    warehouse: "tile-warehouse",
    residential: "tile-residential",
    land: "tile-plots",
};

/** Focal point when a photo is cut into a wide, short page banner. */
export const BANNER_POSITION: Partial<Record<PhotoKey, string>> = {
    "sg-highway": "50% 45%",
    "aero-residential": "50% 14%",
    "aero-warehouse": "50% 58%",
    "aero-plots": "50% 18%",
    "aero-society": "50% 30%",
    "aero-farmland": "50% 40%",
    "aero-sabarmati": "50% 55%",
    "banner-warehouse": "50% 50%",
    "banner-residential": "50% 40%",
    "banner-plots": "50% 50%",
};
