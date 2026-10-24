// Builds /public/design/<id>.webp covers for the #gfx gallery.
// For each item: use a local source in scripts/covers-src/<id>.(jpg|jpeg|png|webp) if present,
// otherwise fetch the Behance gallery page, read og:image and download it.
// Also prints "id: year" from the page when it can find one. Existing outputs are skipped.
import { readFile, writeFile, mkdir, access, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "design");
const srcDir = path.join(root, "scripts", "covers-src");

// Keep in sync with visualWorks in lib/data.ts. `cover` is each gallery's og:image, copied from
// the page in a browser; it's used when the page can't be read here (Behance serves scripts a
// bot challenge). Years for lib/data.ts come from the "Published:" line on each page.
const items = [
  { id: "campus-work", url: "https://www.behance.net/gallery/257518891/Campus-Design-Work-IEEE-and-T-P-Cell-JNEC", cover: "https://mir-s3-cdn-cf.behance.net/project_modules/source/ccf8b2257518891.6adb8bb81e897.jpg" },
  { id: "esummit", url: "https://www.behance.net/gallery/252873023/E-Summit-JNEC-Social-Media-Graphic-Design-Showcase", cover: "https://mir-s3-cdn-cf.behance.net/projects/original/fd5efd252873023.Y3JvcCwzMzc1LDI2MzksMCw5Mjc.jpg" },
  { id: "valorant", url: "https://www.behance.net/gallery/119930005/Valorant-Thumbnails", cover: "https://mir-s3-cdn-cf.behance.net/project_modules/source/5d1fd9119930005.60a781bd2f895.jpg" },
  { id: "fortnite", url: "https://www.behance.net/gallery/110221073/Fortnite-Thumbnails", cover: "https://mir-s3-cdn-cf.behance.net/project_modules/source/e5f0de110221073.607d8c513c576.png" },
  { id: "irl", url: "https://www.behance.net/gallery/112701177/IRL-Thumbnails", cover: "https://mir-s3-cdn-cf.behance.net/project_modules/source/d3c48d112701177.60197dce96ed3.png" },
];

const exists = (p) => access(p).then(() => true, () => false);

const meta = (html, prop) =>
  html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${prop}["'][^>]+content=["']([^"']+)`, "i"))?.[1] ??
  html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${prop}["']`, "i"))?.[1];

function parseYear(html) {
  const ts = html.match(/"published_on"\s*:\s*(\d{9,10})/)?.[1] ?? html.match(/"publishedOn"\s*:\s*(\d{9,10})/)?.[1];
  if (ts) return String(new Date(Number(ts) * 1000).getUTCFullYear());
  const iso = html.match(/"datePublished"\s*:\s*"(\d{4})/)?.[1] ?? meta(html, "article:published_time")?.slice(0, 4);
  return iso && /^\d{4}$/.test(iso) ? iso : null;
}

async function localSource(id) {
  if (!(await exists(srcDir))) return null;
  const file = (await readdir(srcDir)).find((f) => /\.(jpe?g|png|webp)$/i.test(f) && path.parse(f).name === id);
  return file ? readFile(path.join(srcDir, file)) : null;
}

async function readPage(url) {
  const res = await fetch(url, { headers: { "User-Agent": "portfolio-cover-script" } });
  if (!res.ok) throw new Error(`page HTTP ${res.status}`);
  const html = await res.text();
  if (/js_challenge_value/.test(html)) throw new Error("Behance returned a bot challenge page");
  return html;
}

async function fetchCover(url, cover) {
  let html = "";
  try {
    html = await readPage(url);
  } catch (err) {
    if (!cover) throw err;
    console.warn(`warn  ${url}: ${err.message}, using known cover (no year)`);
  }
  const year = html ? parseYear(html) : null;
  const img = (html && meta(html, "og:image")) || cover;
  if (!img) throw new Error("no og:image on page");
  const imgRes = await fetch(img);
  if (!imgRes.ok) throw new Error(`image HTTP ${imgRes.status}`);
  return { buf: Buffer.from(await imgRes.arrayBuffer()), year };
}

await mkdir(outDir, { recursive: true });
const years = [];
let failed = 0;

for (const { id, url, cover } of items) {
  const out = path.join(outDir, `${id}.webp`);
  if (await exists(out)) {
    console.log(`skip  ${id} (exists)`);
    continue;
  }
  try {
    let buf = await localSource(id);
    let year = null;
    if (!buf) ({ buf, year } = await fetchCover(url, cover));
    await sharp(buf)
      .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 90 })
      .toFile(out);
    console.log(`ok    ${id}`);
    if (year) years.push(`${id}: ${year}`);
  } catch (err) {
    failed++;
    console.error(`fail  ${id}: ${err.message}`);
  }
}

if (years.length) console.log(`\nYears (paste into lib/data.ts):\n${years.join("\n")}`);
if (failed) console.log(`\n${failed} failed. Save covers manually as scripts/covers-src/<id>.jpg|png and re-run.`);
