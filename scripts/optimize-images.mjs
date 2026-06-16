/*
 * One-off image optimizer for the storefront's product/category photos.
 *
 * The source photos are full-resolution phone shots (~2–3 MB, up to 4032px).
 * Served as-is they make every catalogue page 15–30 MB. This resizes them to a
 * web-sensible size IN PLACE (same paths, so no code/seed changes) and backs up
 * each untouched original to ../_image-originals/ first (run once; idempotent).
 *
 * Usage:  node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');                       // customer-website/
const IMG_ROOT = path.join(ROOT, 'public', 'assets', 'images');
const BACKUP_ROOT = path.resolve(ROOT, '..', '_image-originals'); // project-root/_image-originals

const MAX_W = 1400;        // plenty for full-width hero + product zoom
const QUALITY = 82;        // mozjpeg — visually lossless at display sizes
const EXT = new Set(['.jpg', '.jpeg', '.png']);

let scanned = 0, optimized = 0, skipped = 0, beforeBytes = 0, afterBytes = 0;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { await walk(full); continue; }
    if (!EXT.has(path.extname(e.name).toLowerCase())) continue;
    await processFile(full);
  }
}

async function processFile(file) {
  scanned++;
  const rel = path.relative(IMG_ROOT, file);
  const stat = await fs.stat(file);
  const meta = await sharp(file).metadata().catch(() => null);
  if (!meta) { skipped++; return; }

  // Already web-sized and small → leave it.
  if ((meta.width || 0) <= MAX_W && stat.size < 350 * 1024) { skipped++; return; }

  // Back up the original once.
  const backup = path.join(BACKUP_ROOT, rel);
  try { await fs.access(backup); } catch {
    await fs.mkdir(path.dirname(backup), { recursive: true });
    await fs.copyFile(file, backup);
  }

  const isPng = path.extname(file).toLowerCase() === '.png';
  // Read into a buffer first so sharp holds no handle on `file` during the write
  // (avoids Windows EBUSY/UNKNOWN locks from the dev server watching /public).
  const input = await fs.readFile(file);
  const pipeline = sharp(input)
    .rotate() // honour EXIF orientation before stripping metadata
    .resize({ width: MAX_W, withoutEnlargement: true });
  const buf = isPng
    ? await pipeline.png({ quality: QUALITY, compressionLevel: 9 }).toBuffer()
    : await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();

  // Only write if we actually saved space.
  if (buf.length < stat.size) {
    const tmp = file + '.tmp';
    await fs.writeFile(tmp, buf);
    for (let attempt = 1; ; attempt++) {
      try { await fs.rename(tmp, file); break; }
      catch (err) {
        if (attempt >= 5) { await fs.unlink(tmp).catch(() => {}); throw err; }
        await new Promise(r => setTimeout(r, 200 * attempt));
      }
    }
    optimized++;
    beforeBytes += stat.size;
    afterBytes += buf.length;
    console.log(`  ✓ ${rel}  ${(stat.size / 1024).toFixed(0)}KB → ${(buf.length / 1024).toFixed(0)}KB`);
  } else {
    skipped++;
  }
}

const mb = (b) => (b / 1024 / 1024).toFixed(1);
console.log('Optimizing images under', IMG_ROOT);
await walk(IMG_ROOT);
console.log('\n──────────────────────────────');
console.log(`Scanned:   ${scanned}`);
console.log(`Optimized: ${optimized}`);
console.log(`Skipped:   ${skipped}`);
console.log(`Saved:     ${mb(beforeBytes)}MB → ${mb(afterBytes)}MB  (−${mb(beforeBytes - afterBytes)}MB)`);
console.log(`Originals backed up to: ${BACKUP_ROOT}`);
