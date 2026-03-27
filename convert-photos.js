/**
 * Converts all non-WebP photos in photos/ to WebP format, removes the
 * originals, then rebuilds photos/index.json.
 *
 * Run from the website/ directory:
 *   node convert-photos.js
 *
 * Options (edit below):
 */
const QUALITY      = 80;   // WebP quality 1-100
const MAX_DIMENSION = 2000; // Resize so neither side exceeds this (preserves aspect ratio)

const fs   = require('fs');
const path = require('path');
const sharp = require('sharp');

const PHOTO_EXTENSIONS = /\.(jpg|jpeg|png|gif|tiff?|bmp|heic)$/i;
const WEBP_EXTENSION   = /\.webp$/i;
const photosDir        = path.join(__dirname, 'photos');

async function convertAll() {
  const categories = ['national_parks', 'national_monuments'];
  let converted = 0;
  let skipped   = 0;

  for (const category of categories) {
    const categoryDir = path.join(photosDir, category);
    if (!fs.existsSync(categoryDir)) continue;

    for (const folder of fs.readdirSync(categoryDir)) {
      const folderPath = path.join(categoryDir, folder);
      if (!fs.statSync(folderPath).isDirectory()) continue;

      for (const file of fs.readdirSync(folderPath)) {
        const filePath = path.join(folderPath, file);

        if (WEBP_EXTENSION.test(file)) {
          skipped++;
          continue;
        }

        if (!PHOTO_EXTENSIONS.test(file)) continue;

        const outName = file.replace(/\.[^.]+$/, '.webp');
        const outPath = path.join(folderPath, outName);

        try {
          await sharp(filePath)
            .rotate()  // bake EXIF orientation into pixels before any other operation
            .resize(MAX_DIMENSION, MAX_DIMENSION, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: QUALITY })
            .toFile(outPath);

          fs.unlinkSync(filePath);
          console.log(`  converted: ${category}/${folder}/${file} → ${outName}`);
          converted++;
        } catch (err) {
          console.error(`  ERROR converting ${file}:`, err.message);
        }
      }
    }
  }

  console.log(`\nDone — ${converted} file(s) converted, ${skipped} already WebP.`);
}

function rebuildIndex() {
  const PHOTO_EXT = /\.(jpg|jpeg|png|webp|gif)$/i;
  const index = { national_parks: {}, national_monuments: {} };

  for (const category of ['national_parks', 'national_monuments']) {
    const categoryDir = path.join(photosDir, category);
    if (!fs.existsSync(categoryDir)) continue;

    for (const folder of fs.readdirSync(categoryDir)) {
      const folderPath = path.join(categoryDir, folder);
      if (!fs.statSync(folderPath).isDirectory()) continue;

      const files = fs.readdirSync(folderPath)
        .filter(f => PHOTO_EXT.test(f))
        .sort();

      if (files.length > 0) index[category][folder] = files;
    }
  }

  fs.writeFileSync(
    path.join(photosDir, 'index.json'),
    JSON.stringify(index, null, 2) + '\n'
  );

  const total = Object.values(index).reduce((s, cat) => s + Object.keys(cat).length, 0);
  console.log(`index.json updated — ${total} feature folder(s) indexed.`);
}

convertAll().then(rebuildIndex);
