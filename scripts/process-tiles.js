/**
 * Category tile crops: 4:3 frames cut from the processed aerial / skyline
 * photos in public/photos so each one shows its subject clearly (apartment
 * blocks, sheds by the highway, farmland plots, office towers) instead of a
 * wide, hazy overview. Never upscales.
 *   node scripts/process-tiles.js
 * Crops are fractions of the 2560px source: [left, top, width, height].
 */
const path = require("path");
const sharp = require("sharp");

const dir = path.join(__dirname, "..", "public", "photos");

const JOBS = [
    {
        key: "tile-residential",
        from: "aero-residential-2560.webp",
        crop: [0.0, 0, 0.675, 1],
    },
    {
        key: "tile-warehouse",
        from: "aero-warehouse-2560.webp",
        crop: [0.3, 0, 0.675, 1],
    },
    {
        key: "tile-plots",
        from: "aero-farmland-2560.webp",
        crop: [0.0, 0, 0.675, 1],
    },
    {
        key: "tile-commercial",
        from: "sg-highway-2560.webp",
        crop: [0.385, 0, 0.615, 1],
    },
];

(async () => {
    for (const { key, from, crop } of JOBS) {
        const file = path.join(dir, from);
        const meta = await sharp(file).metadata();
        const region = {
            left: Math.round(meta.width * crop[0]),
            top: Math.round(meta.height * crop[1]),
            width: Math.round(meta.width * crop[2]),
            height: Math.round(meta.height * crop[3]),
        };
        const done = [];
        for (const width of [640, 1000]) {
            if (region.width < width) continue;
            await sharp(file)
                .extract(region)
                .resize({
                    width,
                    height: Math.round((width * 3) / 4),
                    fit: "cover",
                })
                .sharpen({ sigma: 0.5 })
                .webp({ quality: 82, effort: 5 })
                .toFile(path.join(dir, `${key}-${width}.webp`));
            done.push(width);
        }
        console.log(
            key,
            `crop ${region.width}x${region.height}`,
            "->",
            done.join(", "),
        );
    }
})();
