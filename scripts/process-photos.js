/**
 * One-off helper: turns the downloaded source photos into responsive WebP sets
 * in public/photos. Never upscales: a size is only written if the source is
 * at least that wide, so nothing on the site is ever stretched into blur.
 *   node scripts/process-photos.js <sourceDir>
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const src = process.argv[2];
const out = path.join(__dirname, "..", "public", "photos");
const WIDTHS = [640, 1280, 1920, 2560];

(async () => {
    fs.mkdirSync(out, { recursive: true });
    for (const f of fs.readdirSync(src).filter((x) => /\.jpe?g$/i.test(x))) {
        const key = f.replace(/\.jpe?g$/i, "");
        const meta = await sharp(path.join(src, f)).metadata();
        const done = [];
        for (const w of WIDTHS) {
            if (meta.width < w) continue;
            await sharp(path.join(src, f))
                .rotate()
                .resize({ width: w, kernel: "lanczos3" })
                .sharpen({ sigma: 0.5 })
                .webp({ quality: 82, effort: 5 })
                .toFile(path.join(out, `${key}-${w}.webp`));
            done.push(w);
        }
        // largest native size as well, if it falls between the steps
        console.log(key, `${meta.width}x${meta.height}`, "->", done.join(", "));
    }
})();
