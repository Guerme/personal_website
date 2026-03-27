/**
 * Scans photos/national_parks/ and photos/national_monuments/ and writes
 * photos/index.json so the map can discover which photos exist for each feature.
 *
 * Run from the website/ directory:
 *   node generate-photo-index.js
 */

const fs   = require('fs');
const path = require('path');

const PHOTO_EXTENSIONS = /\.(jpg|jpeg|png|webp|gif)$/i;
const photosDir = path.join(__dirname, 'photos');
const index = { national_parks: {}, national_monuments: {} };

for (const category of ['national_parks', 'national_monuments']) {
  const categoryDir = path.join(photosDir, category);
  if (!fs.existsSync(categoryDir)) continue;

  for (const folder of fs.readdirSync(categoryDir)) {
    const folderPath = path.join(categoryDir, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const files = fs.readdirSync(folderPath)
      .filter(f => PHOTO_EXTENSIONS.test(f))
      .sort();

    if (files.length > 0) {
      index[category][folder] = files;
    }
  }
}

fs.writeFileSync(
  path.join(photosDir, 'index.json'),
  JSON.stringify(index, null, 2) + '\n'
);

const total = Object.values(index).reduce((s, cat) => s + Object.keys(cat).length, 0);
console.log(`index.json updated — ${total} feature folder(s) indexed.`);
