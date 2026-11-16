/**
 * Category photos that say what the property is at a glance.
 *   node scripts/process-category.js <warehouse.jpg> <apartments.jpg> <towers.jpg>
 *
 * Sources (Wikimedia Commons, see PHOTO_CREDITS in src/config/site.ts):
 *   warehouse  - "Paddy stored in warehouse" (Ganesh Dhamodkar, CC BY-SA 4.0)
 *   apartments - "Ashiana Brahmanand, Jamshedpur 01" (Ank Kumar, CC BY-SA 4.0)
 *   towers     - "Gurgoan3" (Pithwilds, CC BY-SA 3.0)
 * Plots reuse the existing farmland aerial; the plot layout lines are drawn
 * live by <PlotLayout /> so they can use the site font and animate.
 * Nothing is upscaled: each output width is skipped if the crop is narrower.
 */
const path = require("path");
const sharp = require("sharp");

const [, , warehouse, apartments, towers] = process.argv;
const dir = path.join(__dirname, "..", "public", "photos");

// crops are fractions of the source: [left, top, width, height]
const JOBS = [
    {
        key: "tile-warehouse",
        file: warehouse,
        crop: [0, 0.04, 1, 0.94],
        ratio: 4 / 3,
        widths: [640, 1000],
    },
    {
        key: "tile-residential",
        file: apartments,
        crop: [0, 0.1, 1, 0.74],
        ratio: 4 / 3,
        widths: [640, 1000],
    },
    {
        key: "banner-warehouse",
        file: warehouse,
        crop: [0, 0.08, 1, 0.58],
        ratio: 2560 / 1100,
        widths: [1280, 1920, 2560],
    },
    {
        key: "banner-residential",
        file: towers,
        crop: [0, 0.02, 1, 0.6],
        ratio: 2560 / 1100,
        widths: [1280, 1920, 2560],
    },
    {
        key: "banner-plots",
        file: path.join(dir, "aero-farmland-2560.webp"),
        crop: [0, 0.05, 1, 0.9],
        ratio: 2560 / 1100,
        widths: [1280, 1920, 2560],
    },
];

(async () => {
    for (const { key, file, crop, ratio, widths } of JOBS) {
        const meta = await sharp(file).metadata();
        const region = {
            left: Math.round(meta.width * crop[0]),
            top: Math.round(meta.height * crop[1]),
            width: Math.round(meta.width * crop[2]),
            height: Math.round(meta.height * crop[3]),
        };
        // trim the region to the target aspect ratio, keeping it centred
        if (region.width / region.height > ratio) {
            const w = Math.round(region.height * ratio);
            region.left += Math.round((region.width - w) / 2);
            region.width = w;
        } else {
            const h = Math.round(region.width / ratio);
            region.top += Math.round((region.height - h) / 2);
            region.height = h;
        }
        const done = [];
        for (const width of widths) {
            if (region.width < width) continue;
            await sharp(file)
                .rotate()
                .extract(region)
                .resize({ width, height: Math.round(width / ratio) })
                .sharpen({ sigma: 0.5 })
                .webp({ quality: width > 1200 ? 78 : 82, effort: 5 })
                .toFile(path.join(dir, `${key}-${width}.webp`));
            done.push(width);
        }
        console.log(
            key,
            `crop ${region.width}x${region.height}`,
            "->",
            done.join(", ") || "(too small)",
        );
    }
})();
