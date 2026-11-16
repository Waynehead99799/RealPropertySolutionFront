/**
 * Smoke test (npm test): checks that every file the site refers to exists, so a
 * missing photo or font fails the build instead of showing up as a broken image.
 *   node scripts/smoke-test.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const exists = (p) => fs.existsSync(path.join(root, p));

const problems = [];
let checked = 0;
const need = (file, why) => {
    checked += 1;
    if (!exists(file)) problems.push(`${file}  (${why})`);
};

// 1. every photo size listed in src/lib/photos.ts is on disk
const photos = read("src/lib/photos.ts");
const widths = photos.match(/const WIDTHS[^{]*\{([\s\S]*?)\n\};/);
if (!widths) {
    problems.push("src/lib/photos.ts: could not find the WIDTHS table");
} else {
    const re = /"([a-z0-9-]+)":\s*\[([\d,\s]+)\]/g;
    let m;
    let keys = 0;
    while ((m = re.exec(widths[1]))) {
        keys += 1;
        for (const w of m[2]
            .split(",")
            .map((n) => n.trim())
            .filter(Boolean)) {
            need(
                `public/photos/${m[1]}-${w}.webp`,
                "listed in src/lib/photos.ts",
            );
        }
    }
    if (!keys) problems.push("src/lib/photos.ts: WIDTHS table is empty");
}

// 2. fonts used by the stylesheet
const css = read("src/styles/globals.css");
const fontRe = /url\("(\/fonts\/[^"]+)"\)/g;
let f;
let fonts = 0;
while ((f = fontRe.exec(css))) {
    fonts += 1;
    need(`public${f[1]}`, "used in src/styles/globals.css");
}
if (!fonts) problems.push("src/styles/globals.css: no self-hosted fonts found");

// 3. static files the pages and layout link to
["public/logo.png", "public/sw.js", "public/photos/og-home.jpg"].forEach((p) =>
    need(p, "linked from the site"),
);

if (problems.length) {
    console.error(`smoke test: ${problems.length} problem(s)`);
    problems.forEach((p) => console.error("  missing: " + p));
    process.exit(1);
}
console.log(`smoke test: ${checked} files checked, all present`);
