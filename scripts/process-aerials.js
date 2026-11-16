/**
 * One-off helper for the aerial photographs used on the site.
 * The sources are portrait photographs taken from a plane window, so each one
 * is cropped to a landscape band of ground only (no wing), lightly cleared of
 * haze, and written as responsive WebP. It never upscales.
 *   node scripts/process-aerials.js <sourceDir>
 * Crops are fractions of the source: [left, top, width, height].
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const src = process.argv[2];
const out = path.join(__dirname, "..", "public", "photos");
const WIDTHS = [640, 1280, 1920, 2560];

const CROPS = {
    "aero-residential": [0, 0.62, 1, 0.38],
    "aero-warehouse": [0, 0.62, 1, 0.38],
    "aero-plots": [0, 0.62, 1, 0.38],
    "aero-society": [0, 0.62, 1, 0.38],
    "aero-farmland": [0, 0.62, 1, 0.38],
    "aero-sabarmati": [0, 0.4, 1, 0.6],
};

(async () => {
    fs.mkdirSync(out, { recursive: true });
    for (const [key, [l, t, w, h]] of Object.entries(CROPS)) {
        const file = path.join(src, `${key}.jpg`);
        const meta = await sharp(file).metadata();
        const region = {
            left: Math.round(meta.width * l),
            top: Math.round(meta.height * t),
            width: Math.round(meta.width * w),
            height: Math.round(meta.height * h),
        };
        const done = [];
        for (const width of WIDTHS) {
            if (region.width < width) continue;
            await sharp(file)
                .extract(region)
                .resize({ width, kernel: "lanczos3" })
                // cut the atmospheric haze a little, keep it natural
                .normalise({ lower: 0.5, upper: 99.8 })
                .gamma(1.12)
                .modulate({ brightness: 1.06, saturation: 1.08 })
                .sharpen({ sigma: 0.6 })
                .webp({
                    quality: key === "aero-sabarmati" ? 52 : 80,
                    effort: 5,
                })
                .toFile(path.join(out, `${key}-${width}.webp`));
            done.push(width);
        }
        console.log(
            key,
            `${meta.width}x${meta.height}`,
            "crop",
            `${region.width}x${region.height}`,
            "->",
            done.join(", "),
        );
    }
})();
