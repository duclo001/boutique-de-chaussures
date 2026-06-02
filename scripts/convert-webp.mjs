import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const DIR = path.resolve("public/images/produits");
const EXTS = new Set([".jpg", ".jpeg", ".png", ".jfif"]);

// Fichiers à ignorer (clairement pas des produits)
const SKIP_PATTERNS = [
  /^Copilot_/i,
  /^ma carte/i,
  /^WhatsApp/i,
  /^image \(/i,
  /^imagevei/i,
  /^XPFFR/i,
  /^README/i,
];

function shouldSkip(name) {
  return SKIP_PATTERNS.some((re) => re.test(name));
}

const entries = await readdir(DIR);
let converted = 0;
let skipped = 0;
let already = 0;

for (const file of entries) {
  const ext = path.extname(file).toLowerCase();
  if (!EXTS.has(ext)) continue;
  if (shouldSkip(file)) {
    skipped++;
    continue;
  }
  const base = file.slice(0, -ext.length);
  const outName = base + ".webp";
  const outPath = path.join(DIR, outName);
  if (existsSync(outPath)) {
    already++;
    continue;
  }
  const inPath = path.join(DIR, file);
  try {
    await sharp(inPath)
      .resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outPath);
    converted++;
    console.log("OK  ", outName);
  } catch (err) {
    console.error("ERR ", file, err.message);
  }
}

console.log(`\nConverti: ${converted} | Déjà existant: ${already} | Ignoré: ${skipped}`);
