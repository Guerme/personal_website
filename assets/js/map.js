// ── Scale Value ──
const pageScale = (window.innerWidth * window.innerHeight) / (1920 * 959);
const zoomScale = (4.0 + 1.2 * pageScale) / 5.2;

// ── Map Configs ──
const MAP_CONFIGS = {
  main:          { center: [-100,    38    ], zoom: 5.2 * zoomScale },
  alaska:        { center: [-153,    61    ], zoom: 3.4 * zoomScale },
  hawaii:        { center: [-165.1,  20    ], zoom: 3.9 * zoomScale },
  samoa:         { center: [-169.7, -14.4  ], zoom: 7   * zoomScale },
  marianas:      { center: [145,     20    ], zoom: 7   * zoomScale },
  virgin_islands:{ center: [-64.7,   18.05 ], zoom: 7   * zoomScale },
};

// ── Main Map ──
const vectorSource = new ol.source.Vector();
const vectorLayer  = new ol.layer.Vector({ source: vectorSource });
let alaska_map;
let hawaii_map;
let samoa_map;
let marianas_map;
let virgin_islands_map;

const main_map = new ol.Map({
  target: 'map',
  layers: [new ol.layer.Tile({ source: new ol.source.OSM() }), vectorLayer],
  view: new ol.View({
    center: ol.proj.fromLonLat(MAP_CONFIGS.main.center),
    zoom: MAP_CONFIGS.main.zoom,
    minZoom: 2,
    maxZoom: 18,
  }),
  controls: ol.control.defaults.defaults({ attributionOptions: { collapsible: false } }),
});

// ── Alaska Inset Map ──
// Wrapper carries the shadow (drop-shadow follows the clipped shape)
const s = Math.cbrt(pageScale);
const alaska_wrapper = document.createElement('div');
alaska_wrapper.id = 'alaska-inset';
alaska_wrapper.style.cssText = `
  position: absolute;
  bottom: 20px;
  left: 12px;
  width: ${400*s}px;
  height: ${300*s}px;
  z-index: 10;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
`;
main_map.getTargetElement().appendChild(alaska_wrapper);

// Inner div clips to the chamfered shape with rounded corners (r=8)
// 400×300: diagonal cut from (300,0) to (400,75), rounded at the 3 right-angle corners
const alaska_div = document.createElement('div');
alaska_div.style.cssText = `width: 100%; height: 100%; overflow: hidden;`;
alaska_div.style.clipPath = `path('m ${8*s},0 h ${234*s} c ${10.08645*s},${0.22903816*s} ${13.89497*s},${3.3440934*s} ${20.77009*s},${10.705872*s} L ${392.84965*s},${143.09541*s} c ${5.78131*s},${5.61884*s} ${5.96965*s},${5.58121*s} ${7.29264*s},${13.68914*s} L ${400*s},${292*s} c ${-0.005*s},${4.41828*s} ${-3.58172*s},${8*s} ${-8*s},${8*s} H ${8*s} c ${-4.418278*s},0 ${-8*s},${-3.58172*s} ${-8*s},${-8*s} V ${8*s} C 0,${3.581722*s} ${3.581722*s},0 ${8*s},0 Z')`;
alaska_wrapper.appendChild(alaska_div);

alaska_map = new ol.Map({
  target: alaska_div,
  layers: [
    new ol.layer.Tile({ source: new ol.source.OSM() }),
    new ol.layer.Vector({ source: vectorSource }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat(MAP_CONFIGS.alaska.center),
    zoom: MAP_CONFIGS.alaska.zoom,
    minZoom: 2,
    maxZoom: 10,
  }),
  controls: ol.control.defaults.defaults({ attributionOptions: { collapsible: false } }),
});

const alaska_label = document.createElement('div');
alaska_label.textContent = 'Alaska';
alaska_label.style.cssText = `
  position: absolute;
  bottom: 4px;
  left: 6px;
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.5);
  pointer-events: none;
  z-index: 1;
`;
alaska_map.getViewport().appendChild(alaska_label);

// ── Hawaii Inset Map ──
const hawaii_wrapper = document.createElement('div');
hawaii_wrapper.id = 'hawaii-inset';
hawaii_wrapper.style.cssText = `
  position: absolute;
  bottom: ${20 + 300*s + 10}px;
  left: 12px;
  width: ${250*s}px;
  height: ${150*s}px;
  z-index: 10;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
`;
main_map.getTargetElement().appendChild(hawaii_wrapper);

const hawaii_div = document.createElement('div');
hawaii_div.style.cssText = `width: 100%; height: 100%; overflow: hidden;`;
hawaii_div.style.clipPath = `path('M ${8*s},0 H ${242*s} A ${8*s},${8*s} 0 0 1 ${250*s},${8*s} V ${142*s} A ${8*s},${8*s} 0 0 1 ${242*s},${150*s} H ${8*s} A ${8*s},${8*s} 0 0 1 0,${142*s} V ${8*s} A ${8*s},${8*s} 0 0 1 ${8*s},0 Z')`;
hawaii_wrapper.appendChild(hawaii_div);

hawaii_map = new ol.Map({
  target: hawaii_div,
  layers: [
    new ol.layer.Tile({ source: new ol.source.OSM() }),
    new ol.layer.Vector({ source: vectorSource }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat(MAP_CONFIGS.hawaii.center),
    zoom: MAP_CONFIGS.hawaii.zoom,
    minZoom: 2,
    maxZoom: 14,
  }),
  controls: ol.control.defaults.defaults({ attributionOptions: { collapsible: false } }),
});

const hawaii_label = document.createElement('div');
hawaii_label.textContent = 'Hawaii';
hawaii_label.style.cssText = `
  position: absolute;
  bottom: 4px;
  left: 6px;
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.5);
  pointer-events: none;
  z-index: 1;
`;
hawaii_map.getViewport().appendChild(hawaii_label);

// ── American Samoa Inset Map ──
const samoa_wrapper = document.createElement('div');
samoa_wrapper.id = 'samoa-inset';
samoa_wrapper.style.cssText = `
  position: absolute;
  bottom: ${40 + 450*s}px;
  left: 12px;
  width: ${250*s}px;
  height: ${150*s}px;
  z-index: 10;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
`;
main_map.getTargetElement().appendChild(samoa_wrapper);

const samoa_div = document.createElement('div');
samoa_div.style.cssText = `width: 100%; height: 100%; overflow: hidden;`;
samoa_div.style.clipPath = `path('M ${8*s},0 H ${242*s} A ${8*s},${8*s} 0 0 1 ${250*s},${8*s} V ${142*s} A ${8*s},${8*s} 0 0 1 ${242*s},${150*s} H ${8*s} A ${8*s},${8*s} 0 0 1 0,${142*s} V ${8*s} A ${8*s},${8*s} 0 0 1 ${8*s},0 Z')`;
samoa_wrapper.appendChild(samoa_div);

samoa_map = new ol.Map({
  target: samoa_div,
  layers: [
    new ol.layer.Tile({ source: new ol.source.OSM() }),
    new ol.layer.Vector({ source: vectorSource }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat(MAP_CONFIGS.samoa.center),
    zoom: MAP_CONFIGS.samoa.zoom,
    minZoom: 2,
    maxZoom: 14,
  }),
  controls: ol.control.defaults.defaults({ attributionOptions: { collapsible: false } }),
});

const samoa_label = document.createElement('div');
samoa_label.innerHTML = 'American<br>Samoa';
samoa_label.style.cssText = `
  position: absolute;
  bottom: 8px;
  left: 6px;
  line-height: 1.3;
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.5);
  pointer-events: none;
  z-index: 1;
`;
samoa_map.getViewport().appendChild(samoa_label);

// ── Marianas Inset Map ──
const marianas_wrapper = document.createElement('div');
marianas_wrapper.id = 'marianas-inset';
marianas_wrapper.style.cssText = `
  position: absolute;
  bottom: 20px;
  left: ${24 + 400*s}px;
  width: ${200*s}px;
  height: ${150*s}px;
  z-index: 10;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
`;
main_map.getTargetElement().appendChild(marianas_wrapper);

// ── Virgin Islands Anchor ──
main_map.once('rendercomplete', () => {
  const anchor   = ol.proj.fromLonLat([-89.5, 26.2]);
  const pixel    = main_map.getPixelFromCoordinate(anchor);
  const vpHeight = main_map.getViewport().offsetHeight;
  virgin_islands_wrapper.style.left = `${pixel[0] - (250*s) / 2}px`;
  virgin_islands_wrapper.style.top  = `${vpHeight - 20 - 120*s}px`;
});

const marianas_div = document.createElement('div');
marianas_div.style.cssText = `width: 100%; height: 100%; overflow: hidden;`;
marianas_div.style.clipPath = `path('M ${8*s},0 H ${192*s} A ${8*s},${8*s} 0 0 1 ${200*s},${8*s} V ${142*s} A ${8*s},${8*s} 0 0 1 ${192*s},${150*s} H ${8*s} A ${8*s},${8*s} 0 0 1 0,${142*s} V ${8*s} A ${8*s},${8*s} 0 0 1 ${8*s},0 Z')`;
marianas_wrapper.appendChild(marianas_div);

marianas_map = new ol.Map({
  target: marianas_div,
  layers: [
    new ol.layer.Tile({ source: new ol.source.OSM() }),
    new ol.layer.Vector({ source: vectorSource }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat(MAP_CONFIGS.marianas.center),
    zoom: MAP_CONFIGS.marianas.zoom,
    minZoom: 2,
    maxZoom: 14,
  }),
  controls: ol.control.defaults.defaults({ attributionOptions: { collapsible: false } }),
});

const marianas_label = document.createElement('div');
marianas_label.textContent = 'Marianas';
marianas_label.style.cssText = `
  position: absolute;
  bottom: ${20*s + 2}px;
  left: 6px;
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.5);
  pointer-events: none;
  z-index: 1;
`;
marianas_map.getViewport().appendChild(marianas_label);

// ── Virgin Islands Inset Map ──
const virgin_islands_wrapper = document.createElement('div');
virgin_islands_wrapper.id = 'virgin-islands-inset';
virgin_islands_wrapper.style.cssText = `
  position: absolute;
  width: ${250*s}px;
  height: ${120*s}px;
  z-index: 10;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
`;
main_map.getTargetElement().appendChild(virgin_islands_wrapper);

const virgin_islands_div = document.createElement('div');
virgin_islands_div.style.cssText = `width: 100%; height: 100%; overflow: hidden;`;
virgin_islands_div.style.clipPath = `path('M ${8*s},0 H ${242*s} A ${8*s},${8*s} 0 0 1 ${250*s},${8*s} V ${112*s} A ${8*s},${8*s} 0 0 1 ${242*s},${120*s} H ${8*s} A ${8*s},${8*s} 0 0 1 0,${112*s} V ${8*s} A ${8*s},${8*s} 0 0 1 ${8*s},0 Z')`;
virgin_islands_wrapper.appendChild(virgin_islands_div);

virgin_islands_map = new ol.Map({
  target: virgin_islands_div,
  layers: [
    new ol.layer.Tile({ source: new ol.source.OSM() }),
    new ol.layer.Vector({ source: vectorSource }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat(MAP_CONFIGS.virgin_islands.center),
    zoom: MAP_CONFIGS.virgin_islands.zoom,
    minZoom: 2,
    maxZoom: 14,
  }),
  controls: ol.control.defaults.defaults({ attributionOptions: { collapsible: false } }),
});

const virgin_islands_label = document.createElement('div');
virgin_islands_label.innerHTML = 'Virgin<br>Islands';
virgin_islands_label.style.cssText = `
  position: absolute;
  bottom: 2px;
  left: 6px;
  line-height: 1.3;
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.5);
  pointer-events: none;
  z-index: 1;
`;
virgin_islands_map.getViewport().appendChild(virgin_islands_label);

// ── Styles ──
const afrhStyle    = new ol.style.Style({ image: new ol.style.Icon({ src: 'assets/symbology/afrh-logo.svg',          width: 20, height: 20 }) });
const afrhSelected = new ol.style.Style({ image: new ol.style.Icon({ src: 'assets/symbology/afrh-logo-selected.svg', width: 24, height: 24 }) });
const blmStyle     = new ol.style.Style({ image: new ol.style.Icon({ src: 'assets/symbology/blm-logo.svg',           width: 20, height: 20 }) });
const blmSelected  = new ol.style.Style({ image: new ol.style.Icon({ src: 'assets/symbology/blm-logo-selected.svg',  width: 24, height: 24 }) });
const noaaStyle    = new ol.style.Style({ image: new ol.style.Icon({ src: 'assets/symbology/noaa-logo.svg',          width: 20, height: 20 }) });
const noaaSelected = new ol.style.Style({ image: new ol.style.Icon({ src: 'assets/symbology/noaa-logo-selected.svg', width: 24, height: 24 }) });
const npsStyle     = new ol.style.Style({ image: new ol.style.Icon({ src: 'assets/symbology/nps-logo.svg',           width: 20, height: 20 }) });
const npsSelected  = new ol.style.Style({ image: new ol.style.Icon({ src: 'assets/symbology/nps-logo-selected.svg',  width: 24, height: 24 }) });
const usarmyStyle    = new ol.style.Style({ image: new ol.style.Icon({ src: 'assets/symbology/army-logo.svg',           width: 20, height: 20 }) });
const usarmySelected = new ol.style.Style({ image: new ol.style.Icon({ src: 'assets/symbology/army-logo-selected.svg',  width: 24, height: 24 }) });
const usfsStyle    = new ol.style.Style({ image: new ol.style.Icon({ src: 'assets/symbology/usfs-logo.svg',          width: 24, height: 24 }) });
const usfsSelected = new ol.style.Style({ image: new ol.style.Icon({ src: 'assets/symbology/usfs-logo-selected.svg', width: 28, height: 28 }) });
const usfwsStyle    = new ol.style.Style({ image: new ol.style.Icon({ src: 'assets/symbology/usfws-logo.svg',          width: 20, height: 20 }) });
const usfwsSelected = new ol.style.Style({ image: new ol.style.Icon({ src: 'assets/symbology/usfws-logo-selected.svg', width: 24, height: 24 }) });

const STYLE = {
  park_visited:   npsStyle,
  park_unvisited: npsStyle,
  mon_visited:    new ol.style.Style({ image: new ol.style.Circle({ radius: 7, fill: new ol.style.Fill({ color: '#c97d4e' }), stroke: new ol.style.Stroke({ color: '#0c0c0c', width: 1.5 }) }) }),
  mon_unvisited:  new ol.style.Style({ image: new ol.style.Circle({ radius: 6, fill: new ol.style.Fill({ color: 'rgba(255,255,255,0.15)' }), stroke: new ol.style.Stroke({ color: '#c97d4e', width: 1.5 }) }) }),
};
const HIGHLIGHT = {
  park_visited:   [npsSelected, npsStyle],
  park_unvisited: [npsSelected, npsStyle],
  mon_visited:    [npsSelected, STYLE.mon_visited],
  mon_unvisited:  [npsSelected, STYLE.mon_unvisited],
};

function getMonStyle(agency) {
  if (agency && agency.includes('Armed Forces Retirement Home'))  return afrhStyle;
  if (agency && agency.includes('Bureau of Land Management'))     return blmStyle;
  if (agency && agency.includes('NOAA'))                         return noaaStyle;
  if (agency && agency.includes('National Park Service'))         return npsStyle;
  if (agency && agency.includes('U.S. Army'))                    return usarmyStyle;
  if (agency && agency.includes('U.S. Fish & Wildlife Service')) return usfwsStyle;
  if (agency && agency.includes('U.S. Forest Service'))          return usfsStyle;
  return null;
}

function getHighlightStyle(feature) {
  const type = feature.get('type');
  if (type === 'mon') {
    const agency = feature.get('agency');
    if (agency && agency.includes('Armed Forces Retirement Home'))  return [afrhStyle,   afrhSelected];
    if (agency && agency.includes('Bureau of Land Management'))     return [blmStyle,    blmSelected];
    if (agency && agency.includes('NOAA'))                         return [noaaStyle,   noaaSelected];
    if (agency && agency.includes('National Park Service'))         return [npsStyle,    npsSelected];
    if (agency && agency.includes('U.S. Army'))                    return [usarmyStyle, usarmySelected];
    if (agency && agency.includes('U.S. Fish & Wildlife Service')) return [usfwsStyle,  usfwsSelected];
    if (agency && agency.includes('U.S. Forest Service'))          return [usfsStyle,   usfsSelected];
  }
  const key = `${type}_${feature.get('visited') ? 'visited' : 'unvisited'}`;
  return HIGHLIGHT[key];
}

function restoreStyle(feature) {
  const type = feature.get('type');
  const monStyle = type === 'mon' ? getMonStyle(feature.get('agency')) : null;
  feature.setStyle(monStyle ?? STYLE[`${type}_${feature.get('visited') ? 'visited' : 'unvisited'}`]);
}

// ── Features ──
function makeFeatures(data, type) {
  return data.map(d => {
    const f = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([d.lon, d.lat])),
      name:    d.name,
      visited: d.visited,
      type,
      agency:  d.agency  || null,
      website: d.website || null,
    });
    const monStyle = type === 'mon' ? getMonStyle(d.agency) : null;
    f.setStyle(monStyle ?? STYLE[`${type}_${d.visited ? 'visited' : 'unvisited'}`]);
    return f;
  });
}

fetch('assets/constants.json')
  .then(r => r.json())
  .then(({ nationalParks, nationalMonuments }) => {
    vectorSource.addFeatures([
      ...makeFeatures(nationalParks, 'park'),
      ...makeFeatures(nationalMonuments, 'mon'),
    ]);
  });

let photoIndex = {};
fetch('photos/index.json')
  .then(r => r.json())
  .then(idx => { photoIndex = idx; })
  .catch(() => {});

// ── Visited date helpers ──
function isDateVisited(val) {
  return typeof val === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(val);
}

function formatVisitedDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

// ── Photo helpers ──
function nameToFolderSlug(name) {
  return name.toLowerCase().replace(/ /g, '_');
}

let popupPhotoData = []; // [{src, w, h}, ...] sorted widest-first, read by openLightbox

function loadAndSortByWidth(srcs) {
  if (srcs.length === 0) return Promise.resolve([]);
  return Promise.all(srcs.map(src => new Promise(resolve => {
    const img = new Image();
    img.onload  = () => resolve({ src, w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => resolve({ src, w: 0, h: 0 });
    img.src = src;
  }))).then(data => data.sort((a, b) => b.w - a.w));
}

// ── Lightbox ──
let lightboxPhotos     = [];
let lightboxIndex      = 0;
let lightboxFixedWidth = 0;

const lightboxEl = document.createElement('div');
lightboxEl.style.cssText = `
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.78);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
`;
document.body.appendChild(lightboxEl);

const lightboxCloseBtn = document.createElement('button');
lightboxCloseBtn.textContent = '✕';
lightboxCloseBtn.style.cssText = `
  position: absolute;
  top: 16px;
  right: 20px;
  background: none;
  border: none;
  color: rgba(255,255,255,0.85);
  font-size: 22px;
  cursor: pointer;
  line-height: 1;
  padding: 0;
`;
lightboxEl.appendChild(lightboxCloseBtn);

// Row: prev button — image — next button
const lightboxRow = document.createElement('div');
lightboxRow.style.cssText = `display: flex; align-items: center; gap: 16px;`;
lightboxEl.appendChild(lightboxRow);

const navBtnCSS = `
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  color: white;
  font-size: 28px;
  width: 44px;
  height: 44px;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  flex-shrink: 0;
`;

const lightboxPrevBtn = document.createElement('button');
lightboxPrevBtn.innerHTML = '&#8249;';
lightboxPrevBtn.style.cssText = navBtnCSS;
lightboxRow.appendChild(lightboxPrevBtn);

const lightboxImg = document.createElement('img');
lightboxImg.style.cssText = `
  max-width: 75vw;
  max-height: 75vh;
  object-fit: contain;
  background: #000;
  border-radius: 8px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.6);
`;
lightboxRow.appendChild(lightboxImg);

const lightboxNextBtn = document.createElement('button');
lightboxNextBtn.innerHTML = '&#8250;';
lightboxNextBtn.style.cssText = navBtnCSS;
lightboxRow.appendChild(lightboxNextBtn);

const lightboxCounter = document.createElement('span');
lightboxCounter.style.cssText = `
  margin-top: 10px;
  color: rgba(255,255,255,0.75);
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
`;
lightboxEl.appendChild(lightboxCounter);

function updateLightboxImage() {
  lightboxImg.src = lightboxPhotos[lightboxIndex].src;
  const multi = lightboxPhotos.length > 1;
  lightboxPrevBtn.style.display    = multi ? '' : 'none';
  lightboxNextBtn.style.display    = multi ? '' : 'none';
  lightboxCounter.style.display    = multi ? '' : 'none';
  if (multi) lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxPhotos.length}`;
}

function openLightbox(index) {
  lightboxPhotos = popupPhotoData;
  lightboxIndex  = index;

  // Pin the image width to the widest photo's display size so the arrows
  // never shift position as you cycle through photos of different widths.
  const first = lightboxPhotos[0];
  if (first && first.w > 0 && first.h > 0) {
    const scale        = Math.min((window.innerWidth * 0.75) / first.w,
                                  (window.innerHeight * 0.75) / first.h);
    lightboxFixedWidth         = Math.round(first.w * scale);
    lightboxImg.style.width    = lightboxFixedWidth + 'px';
    lightboxImg.style.maxWidth = 'none';
  } else {
    lightboxImg.style.width    = '';
    lightboxImg.style.maxWidth = '75vw';
  }

  updateLightboxImage();
  lightboxEl.style.opacity       = '1';
  lightboxEl.style.pointerEvents = 'auto';
}

function closeLightbox() {
  lightboxEl.style.opacity       = '0';
  lightboxEl.style.pointerEvents = 'none';
}

lightboxPrevBtn.addEventListener('click', () => {
  lightboxIndex = (lightboxIndex - 1 + lightboxPhotos.length) % lightboxPhotos.length;
  updateLightboxImage();
});
lightboxNextBtn.addEventListener('click', () => {
  lightboxIndex = (lightboxIndex + 1) % lightboxPhotos.length;
  updateLightboxImage();
});
lightboxCloseBtn.addEventListener('click', closeLightbox);
lightboxEl.addEventListener('click', e => { if (e.target === lightboxEl) closeLightbox(); });

// ── Popup ──
const POPUP_GAP = 5;   // px gap between icon edge and popup — adjust here
const ICON_SIZE = 20;  // px, must match icon width/height set in npsStyle — adjust here

const popupEl = document.createElement('div');
popupEl.style.cssText = `
  position: fixed;
  background: rgba(255,255,255,0.96);
  border: 1px solid #e8c4a0;
  border-radius: 10px;
  padding: 8px 14px 8px 14px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: #1a1612;
  box-shadow: 0 4px 16px rgba(0,0,0,0.14);
  white-space: nowrap;
  pointer-events: none;
  transition: opacity 0.15s ease;
  opacity: 0;
  z-index: 1000;
`;
document.body.appendChild(popupEl);
popupEl.addEventListener('click', e => e.stopPropagation());

function buildPopupHTML(feature, sortedPhotos) {
  const label      = feature.get('type') === 'park' ? 'National Park' : 'National Monument';
  const visitedVal = feature.get('visited');
  const hasDate    = isDateVisited(visitedVal);
  const status     = hasDate ? `Date Visited: ${formatVisitedDate(visitedVal)}` : 'Not Yet Visited';
  const color      = hasDate ? '#5a8fa8' : '#c47878';
  const website    = feature.get('website');

  const websiteLine = website
    ? `<br><a href="${website}" target="_blank" rel="noopener" style="font-size:11px;color:#5a8fa8;text-decoration:none;">Website: ${website}</a>`
    : '';

  popupPhotoData = sortedPhotos;

  if (sortedPhotos.length > 0) {
    popupEl.style.whiteSpace = 'normal';
    popupEl.style.width      = '260px';
  } else {
    popupEl.style.whiteSpace = 'nowrap';
    popupEl.style.width      = '';
  }

  const thumbsHTML = sortedPhotos.map(({ src }, i) =>
    `<img src="${src}" onclick="openLightbox(${i})"
          style="width:calc(50% - 2px);aspect-ratio:1;object-fit:cover;border-radius:4px;cursor:pointer;"
          alt="">`
  ).join('');

  const photosSection = sortedPhotos.length > 0 ? `
    <div style="margin-top:8px;border-top:1px solid #eee;padding-top:6px;">
      <span style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.05em;">Photos</span>
      <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:4px;">${thumbsHTML}</div>
    </div>` : '';

  return `
    <button onclick="closePopup()" style="position:absolute;top:4px;right:6px;background:none;border:none;cursor:pointer;font-size:14px;color:#999;line-height:1;padding:0;">✕</button>
    <strong>${feature.get('name')} ${label}</strong><br>
    <span style="color:${color};font-size:11px">${status}</span>${websiteLine}
    ${photosSection}
  `;
}

function showPopup(mapInstance, pixel, constraintEl) {
  const mapRect   = mapInstance.getTargetElement().getBoundingClientRect();
  const boundRect = constraintEl ? constraintEl.getBoundingClientRect() : mapRect;
  const pw = popupEl.offsetWidth;
  const ph = popupEl.offsetHeight;

  const iconLeft   = mapRect.left + pixel[0] - ICON_SIZE / 2;
  const iconRight  = mapRect.left + pixel[0] + ICON_SIZE / 2;
  const iconTop    = mapRect.top  + pixel[1] - ICON_SIZE / 2;
  const iconBottom = mapRect.top  + pixel[1] + ICON_SIZE / 2;

  // Order of preference: top-left, top-right, bottom-left, bottom-right
  const candidates = [
    { left: iconLeft - pw  - POPUP_GAP, top: iconTop    - ph - POPUP_GAP },
    { left: iconRight      + POPUP_GAP, top: iconTop    - ph - POPUP_GAP },
    { left: iconLeft - pw  - POPUP_GAP, top: iconBottom      + POPUP_GAP },
    { left: iconRight      + POPUP_GAP, top: iconBottom      + POPUP_GAP },
  ];

  const fits = ({ left, top }) =>
    left >= boundRect.left &&
    left + pw <= boundRect.right &&
    top  >= boundRect.top  &&
    top  + ph <= boundRect.bottom;

  const pos = candidates.find(fits) ?? {
    left: Math.max(boundRect.left, Math.min(candidates[0].left, boundRect.right  - pw)),
    top:  Math.max(boundRect.top,  Math.min(candidates[0].top,  boundRect.bottom - ph)),
  };

  popupEl.style.left = `${pos.left}px`;
  popupEl.style.top  = `${pos.top}px`;
}

let selectedFeature = null;

function closePopup() {
  if (selectedFeature) {
    restoreStyle(selectedFeature);
    selectedFeature = null;
  }
  popupEl.style.opacity      = '0';
  popupEl.style.pointerEvents = 'none';
}

function registerMapHandlers(mapInstance, isInset = false) {
  mapInstance.on('pointermove', e => {
    const feature = mapInstance.forEachFeatureAtPixel(e.pixel, f => f);
    mapInstance.getTargetElement().style.cursor = feature ? 'pointer' : '';
  });

  mapInstance.on('singleclick', async e => {
    const feature = mapInstance.forEachFeatureAtPixel(e.pixel, f => f);
    if (feature) {
      if (selectedFeature && selectedFeature !== feature) closePopup();
      selectedFeature = feature;
      feature.setStyle(getHighlightStyle(feature));
      const typeFolder   = feature.get('type') === 'park' ? 'national_parks' : 'national_monuments';
      const slug         = nameToFolderSlug(feature.get('name'));
      const files        = (photoIndex[typeFolder] && photoIndex[typeFolder][slug]) || [];
      const srcs         = files.map(f => `photos/${typeFolder}/${slug}/${f}`);
      const sortedPhotos = await loadAndSortByWidth(srcs);
      popupEl.innerHTML          = buildPopupHTML(feature, sortedPhotos);
      popupEl.style.opacity      = '1';
      popupEl.style.pointerEvents = 'auto';
      const constraintEl = isInset ? main_map.getTargetElement() : null;
      requestAnimationFrame(() => showPopup(mapInstance, e.pixel, constraintEl));
    } else {
      closePopup();
    }
  });
}

registerMapHandlers(main_map);
registerMapHandlers(alaska_map,          true);
registerMapHandlers(hawaii_map,          true);
registerMapHandlers(samoa_map,           true);
registerMapHandlers(marianas_map,        true);
registerMapHandlers(virgin_islands_map,  true);

// ── Legend ──
const legend = document.createElement('div');
legend.className = 'map-legend';
legend.innerHTML = `
  <div class="legend-handle" id="legend-handle">
    <span class="legend-title">Map Legend</span>
    <span class="legend-drag-hint">⠿</span>
  </div>
  <div class="legend-filter-row">
    <span class="legend-filter-label">National Parks</span>
    <button id="park-visited-toggle" class="legend-toggle" onclick="toggleParkFilter('visited')">Visited</button>
    <button id="park-unvisited-toggle" class="legend-toggle" onclick="toggleParkFilter('unvisited')">Not Visited</button>
  </div>
  <div class="legend-filter-row">
    <span class="legend-filter-label">National<br>Monuments</span>
    <button id="mon-visited-toggle" class="legend-toggle" onclick="toggleMonFilter('visited')">Visited</button>
    <button id="mon-unvisited-toggle" class="legend-toggle" onclick="toggleMonFilter('unvisited')">Not Visited</button>
  </div>
  <div class="legend-agencies">
    <div class="legend-agencies-title">Governing Agencies</div>
    <ul class="legend-items">
      <li class="legend-row">
        <img src="assets/symbology/afrh-logo.svg" class="legend-icon-img" />
        <span>Armed Forces Retirement Home</span>
      </li>
      <li class="legend-row">
        <img src="assets/symbology/blm-logo.svg" class="legend-icon-img" />
        <span>Bureau of Land Management</span>
      </li>
      <li class="legend-row">
        <img src="assets/symbology/noaa-logo.svg" class="legend-icon-img" />
        <span>NOAA</span>
      </li>
      <li class="legend-row">
        <img src="assets/symbology/nps-logo.svg" class="legend-icon-img" />
        <span>National Park Service</span>
      </li>
      <li class="legend-row">
        <img src="assets/symbology/army-logo.svg" class="legend-icon-img" />
        <span>U.S. Army</span>
      </li>
      <li class="legend-row">
        <img src="assets/symbology/usfws-logo.svg" class="legend-icon-img" />
        <span>U.S. Fish &amp; Wildlife Service</span>
      </li>
      <li class="legend-row">
        <img src="assets/symbology/usfs-logo.svg" class="legend-icon-img" />
        <span>U.S. Forest Service</span>
      </li>
    </ul>
  </div>
`;

legend.style.visibility = 'hidden';
legend.addEventListener('pointerdown', e => e.stopPropagation());
legend.addEventListener('click',       e => e.stopPropagation());
main_map.getViewport().appendChild(legend);

main_map.once('rendercomplete', () => {
  const pixel = main_map.getPixelFromCoordinate(ol.proj.fromLonLat([-68.8, 34.5]));
  if (pixel) {
    const vpWidth = main_map.getViewport().offsetWidth;
    legend.style.right  = 'auto';
    legend.style.bottom = 'auto';
    legend.style.left   = `${vpWidth - legend.offsetWidth - 5}px`;
    legend.style.top    = `${pixel[1] - legend.offsetHeight / 2}px`;
  }
  legend.style.visibility = 'visible';
});

const dragHandle = document.getElementById('legend-handle');
let dragging = false, dragOffX = 0, dragOffY = 0;

dragHandle.addEventListener('mousedown', e => {
  dragging = true;
  const rect = legend.getBoundingClientRect();
  dragOffX = e.clientX - rect.left;
  dragOffY = e.clientY - rect.top;
  e.preventDefault();
});

document.addEventListener('mousemove', e => {
  if (!dragging) return;
  const vp     = main_map.getViewport();
  const vpRect = vp.getBoundingClientRect();
  let x = e.clientX - vpRect.left - dragOffX;
  let y = e.clientY - vpRect.top  - dragOffY;
  x = Math.max(0, Math.min(x, vpRect.width  - legend.offsetWidth));
  y = Math.max(0, Math.min(y, vpRect.height - legend.offsetHeight));
  legend.style.left   = `${x}px`;
  legend.style.top    = `${y}px`;
  legend.style.right  = 'auto';
  legend.style.bottom = 'auto';
});

document.addEventListener('mouseup', () => { dragging = false; });

// ── Legend Minimize ──
const legendMinBtn = document.createElement('button');
legendMinBtn.innerHTML = '→';
legendMinBtn.title = 'Minimize';
legendMinBtn.style.cssText = 'position: absolute; top: 50%; right: 6px; transform: translateY(-50%); background: rgba(255,255,255,0.92); border: 1px solid var(--card-border); ' +
                             'border-radius: 4px; width: 16px; height: 16px; font-size: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; ' +
                                    'z-index: 1; line-height: 1;';
document.getElementById('legend-handle').appendChild(legendMinBtn);

const legendOverlay = document.createElement('div');
legendOverlay.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgb(250,249,249); border-radius: 12px; display: none; align-items: center; justify-content: center; padding-top: 22px; box-sizing: border-box; z-index: 1;';
const legendOverlayLabel = document.createElement('div');
legendOverlayLabel.textContent = 'Map Legend';
legendOverlayLabel.style.cssText = "font-family: var(--font-body); font-size: 11px; font-weight: 600; letter-spacing: 0.1em; color: var(--ink-soft); writing-mode: vertical-lr; transform: rotate(180deg);";
legendOverlay.appendChild(legendOverlayLabel);
legend.appendChild(legendOverlay);

const legendExpandBtn = document.createElement('button');
legendExpandBtn.innerHTML = '←';
legendExpandBtn.title = 'Expand';
legendExpandBtn.style.cssText = 'position: absolute; top: 6px; left: 50%; transform: translateX(-50%); background: rgba(255,255,255,0.92); ' +
                                'border: 1px solid var(--card-border); border-radius: 4px; width: 16px; height: 16px; font-size: 10px; cursor: pointer; display: none; ' +
                                'align-items: center; justify-content: center; z-index: 2; line-height: 1;';
legend.appendChild(legendExpandBtn);

let legendFullWidth = null, legendFullHeight = null;

let legendSavedLeft = null;

legendMinBtn.addEventListener('click', e => {
  e.stopPropagation();
  legendFullWidth  = legend.offsetWidth;
  legendFullHeight = legend.offsetHeight;
  legendSavedLeft  = legend.style.left;
  legend.style.left   = `${parseFloat(legend.style.left) + legendFullWidth - 30}px`;
  legend.style.width  = '30px';
  legend.style.height = `${legendFullHeight}px`;
  legend.style.overflow = 'hidden';
  legendOverlay.style.display   = 'flex';
  legendExpandBtn.style.display = 'flex';
  legendMinBtn.style.display    = 'none';
});

legendExpandBtn.addEventListener('click', e => {
  e.stopPropagation();
  legend.style.left   = legendSavedLeft;
  legend.style.width  = `${legendFullWidth}px`;
  legend.style.height = '';
  legend.style.overflow = '';
  legendOverlay.style.display   = 'none';
  legendExpandBtn.style.display = 'none';
  legendMinBtn.style.display    = 'flex';
});

// ── Park filters ──
const parkFilter = { visited: false, unvisited: false };

function toggleParkFilter(which) {
  parkFilter[which] = !parkFilter[which];
  document.getElementById(`park-${which}-toggle`).classList.toggle('active', parkFilter[which]);
  closePopup();
  vectorSource.getFeatures().forEach(f => {
    if (f.get('type') !== 'park') return;
    const isVisited = f.get('visited');
    const hidden = (!isVisited && parkFilter.visited) || (isVisited && parkFilter.unvisited);
    hidden ? f.setStyle([]) : restoreStyle(f);
  });
  if (alaska_map) alaska_map.render();
  if (hawaii_map) hawaii_map.render();
}

// ── Monument filters ──
const monFilter = { visited: false, unvisited: false };

function toggleMonFilter(which) {
  monFilter[which] = !monFilter[which];
  document.getElementById(`mon-${which}-toggle`).classList.toggle('active', monFilter[which]);
  closePopup();
  vectorSource.getFeatures().forEach(f => {
    if (f.get('type') !== 'mon') return;
    const isVisited = f.get('visited');
    const hidden = (!isVisited && monFilter.visited) || (isVisited && monFilter.unvisited);
    hidden ? f.setStyle([]) : restoreStyle(f);
  });
  if (alaska_map) alaska_map.render();
  if (hawaii_map) hawaii_map.render();
}

// ── Reset Extents ──
const HOME_EXTENTS = [
  [main_map,           MAP_CONFIGS.main.center,          MAP_CONFIGS.main.zoom],
  [alaska_map,         MAP_CONFIGS.alaska.center,        MAP_CONFIGS.alaska.zoom],
  [hawaii_map,         MAP_CONFIGS.hawaii.center,        MAP_CONFIGS.hawaii.zoom],
  [samoa_map,          MAP_CONFIGS.samoa.center,         MAP_CONFIGS.samoa.zoom],
  [marianas_map,       MAP_CONFIGS.marianas.center,      MAP_CONFIGS.marianas.zoom],
  [virgin_islands_map, MAP_CONFIGS.virgin_islands.center,MAP_CONFIGS.virgin_islands.zoom],
];

function addResetButton(mapInstance, center, zoom, horizontal = false, newMinimize = false, label = '', leftMinimize = false, expandOnMinimize = false) {
  mapInstance.once('rendercomplete', () => {
    const zoomEl  = mapInstance.getTargetElement().querySelector('.ol-zoom');
    if (!zoomEl) return;
    const zoomIn  = zoomEl.querySelector('.ol-zoom-in');
    const zoomOut = zoomEl.querySelector('.ol-zoom-out');
    if (!zoomIn) return;

    const btn = document.createElement('button');
    btn.className = 'ol-reset-extent';
    btn.title = 'Reset to original extent';
    btn.innerHTML = '↻';
    btn.type = 'button';
    btn.addEventListener('click', e => {
      e.preventDefault();
      mapInstance.getView().animate({ center: ol.proj.fromLonLat(center), zoom, duration: 400 });
    });

    const row = document.createElement('div');
    row.style.cssText = 'display: flex; flex-direction: row; gap: 4px;';
    zoomIn.parentNode.insertBefore(row, zoomIn);
    row.appendChild(zoomIn);
    if (horizontal && zoomOut) row.appendChild(zoomOut);
    row.appendChild(btn);

    if (!horizontal && !newMinimize && !leftMinimize) {
      const wrapper    = mapInstance.getTargetElement().parentElement;
      const fullHeight = wrapper.style.height;
      let minimized    = false;

      const minBtn = document.createElement('button');
      minBtn.className = 'ol-reset-extent';
      minBtn.title = 'Minimize';
      minBtn.innerHTML = '−';
      minBtn.type = 'button';
      minBtn.addEventListener('click', e => {
        e.preventDefault();
        minimized = !minimized;
        wrapper.style.height = minimized ? `${28 * s}px` : fullHeight;
        minBtn.innerHTML     = minimized ? '+' : '−';
      });
      row.appendChild(minBtn);
    }

    if (!horizontal && newMinimize) {
      const wrapper    = mapInstance.getTargetElement().parentElement;
      const fullHeight = wrapper.style.height;

      // Row 2: zoomOut + minimize button (↓)
      const row2 = document.createElement('div');
      row2.style.cssText = 'display: flex; flex-direction: row; gap: 4px; margin-top: 4px;';
      if (zoomOut) row2.appendChild(zoomOut);
      const minBtn = document.createElement('button');
      minBtn.className = 'ol-reset-extent';
      minBtn.title = 'Minimize';
      minBtn.innerHTML = '↓';
      minBtn.type = 'button';
      row2.appendChild(minBtn);
      zoomEl.appendChild(row2);

      // Minimized overlay — blue background + centered label
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #aad3df; display: none; align-items: center; justify-content: center; padding-left: 28px; box-sizing: border-box; z-index: 1;';
      const overlayLabel = document.createElement('div');
      overlayLabel.textContent = `${label} Inset Map`;
      overlayLabel.style.cssText = "font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(0,0,0,0.5);";
      overlay.appendChild(overlayLabel);
      mapInstance.getViewport().appendChild(overlay);

      // Expand button (↑) shown at top-left when minimized
      const expandBtn = document.createElement('button');
      expandBtn.className = 'ol-reset-extent ol-inset-expand';
      expandBtn.title = 'Expand';
      expandBtn.innerHTML = '↑';
      expandBtn.type = 'button';
      expandBtn.style.cssText = 'position: absolute; top: 6px; left: 6px; display: none; z-index: 2;';
      mapInstance.getViewport().appendChild(expandBtn);

      const innerDiv      = mapInstance.getTargetElement();
      const savedClipPath = innerDiv.style.clipPath;
      let savedTop        = null;

      minBtn.addEventListener('click', e => {
        e.preventDefault();
        savedTop = wrapper.style.top;
        const topPx = parseFloat(savedTop);
        if (!isNaN(topPx)) {
          wrapper.style.top = `${topPx + parseFloat(fullHeight) - 30}px`;
        }
        wrapper.style.height    = '30px';
        innerDiv.style.clipPath = 'none';
        zoomEl.style.visibility = 'hidden';
        overlay.style.display   = 'flex';
        expandBtn.style.display = 'flex';
      });

      expandBtn.addEventListener('click', e => {
        e.preventDefault();
        if (savedTop !== null) wrapper.style.top = savedTop;
        wrapper.style.height    = fullHeight;
        innerDiv.style.clipPath = savedClipPath;
        zoomEl.style.visibility = 'visible';
        overlay.style.display   = 'none';
        expandBtn.style.display = 'none';
      });
    }

    if (!horizontal && leftMinimize) {
      const wrapper     = mapInstance.getTargetElement().parentElement;
      const fullWidth   = wrapper.style.width;
      const innerDiv    = mapInstance.getTargetElement();
      const savedClipPath = innerDiv.style.clipPath;

      // Row 2: zoomOut + minimize button (←)
      const row2 = document.createElement('div');
      row2.style.cssText = 'display: flex; flex-direction: row; gap: 4px; margin-top: 4px;';
      if (zoomOut) row2.appendChild(zoomOut);
      const minBtn = document.createElement('button');
      minBtn.className = 'ol-reset-extent';
      minBtn.title = 'Minimize';
      minBtn.innerHTML = '←';
      minBtn.type = 'button';
      row2.appendChild(minBtn);
      zoomEl.appendChild(row2);

      // Minimized overlay — blue background + vertical label(s)
      const overlay = document.createElement('div');
      const labelStyle = "font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(0,0,0,0.5); writing-mode: vertical-lr; transform: rotate(180deg); white-space: normal; word-break: break-word; max-width: 60px;";

      if (expandOnMinimize) {
        // Two-column layout: label name left, "Inset Map" right
        overlay.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #aad3df; display: none; flex-direction: row; z-index: 1;';
        const col1 = document.createElement('div');
        col1.style.cssText = 'flex: 1; display: flex; align-items: left; justify-content: left; padding-top: 28px; box-sizing: border-box; min-width: 0;';
        const col1Label = document.createElement('div');
        col1Label.textContent = label;
        col1Label.style.cssText = labelStyle + ' max-width: 100%;';
        col1.appendChild(col1Label);
        const col2 = document.createElement('div');
        col2.style.cssText = 'flex: 1; display: flex; align-items: left; justify-content: left; padding-top: 28px; box-sizing: border-box; min-width: 0;';
        const col2Label = document.createElement('div');
        col2Label.textContent = 'Inset Map';
        col2Label.style.cssText = labelStyle + ' max-width: 100%;';
        col2.appendChild(col2Label);
        overlay.appendChild(col1);
        overlay.appendChild(col2);
      } else {
        overlay.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #aad3df; display: none; z-index: 1;';
        const overlayLabel = document.createElement('div');
        const reversedLabel = label.split(' ').reverse().join(' '); 
        overlayLabel.textContent = `Inset Map ${reversedLabel}`;
        overlayLabel.style.cssText = "font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(0,0,0,0.5); writing-mode: vertical-lr; transform: translateY(-50%) rotate(180deg); position: absolute; top: 50%; left: 4px; white-space: normal; word-break: break-word; max-width: 60px;";
        overlay.appendChild(overlayLabel);
      }
      mapInstance.getViewport().appendChild(overlay);

      // Expand button (→) shown at top-left when minimized
      const expandBtn = document.createElement('button');
      expandBtn.className = 'ol-reset-extent ol-inset-expand';
      expandBtn.title = 'Expand';
      expandBtn.innerHTML = '→';
      expandBtn.type = 'button';
      expandBtn.style.cssText = expandOnMinimize
        ? 'position: absolute; top: 6px; left: 50%; transform: translateX(-50%); display: none; z-index: 2;'
        : 'position: absolute; top: 6px; left: 6px; display: none; z-index: 2;';
      mapInstance.getViewport().appendChild(expandBtn);

      const collapsedWidth = expandOnMinimize ? '35px' : '30px';

      minBtn.addEventListener('click', e => {
        e.preventDefault();
        innerDiv.style.clipPath = 'none';
        zoomEl.style.visibility = 'hidden';
        overlay.style.display   = 'flex';
        expandBtn.style.display = 'flex';

        // Measure overlay label and expand width to fit text
        requestAnimationFrame(() => {
          const labelEl = overlay.querySelector('div div') || overlay.querySelector('div');
          if (labelEl) {
            const labelHeight = labelEl.scrollHeight;
            wrapper.style.width = `${labelHeight + 12}px`;
          } else {
            wrapper.style.width = collapsedWidth;
          }
        });
      });

      expandBtn.addEventListener('click', e => {
        e.preventDefault();
        wrapper.style.width     = fullWidth;
        innerDiv.style.clipPath = savedClipPath;
        zoomEl.style.visibility = 'visible';
        overlay.style.display   = 'none';
        expandBtn.style.display = 'none';
      });
    }

    zoomEl.style.visibility = 'visible';  // reveal controls after render
  });
}

HOME_EXTENTS.forEach(([m, center, zoom]) => {
  const label     = m === alaska_map        ? 'Alaska'
                  : m === marianas_map      ? 'Marianas'
                  : m === virgin_islands_map? 'Virgin Islands'
                  : m === hawaii_map        ? 'Hawaii'
                  : m === samoa_map         ? 'American Samoa'
                  : '';
  const newMin    = m === virgin_islands_map || m === alaska_map || m === marianas_map;
  const leftMin   = m === hawaii_map || m === samoa_map;
  const expandMin = false;
  addResetButton(m, center, zoom, m === main_map, newMin, label, leftMin, expandMin);
});

// ── Render ──
vectorSource.on('change', () => { alaska_map.render(); hawaii_map.render(); samoa_map.render(); marianas_map.render(); virgin_islands_map.render(); });

// ── Attribution Scaling ──
const attrStyle = document.createElement('style');
attrStyle.textContent = `.ol-attribution, .ol-attribution * { font-size: ${12 * s}px !important; }`;
document.head.appendChild(attrStyle);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      main_map.updateSize();
      alaska_map.updateSize();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
const mapEl = document.getElementById('map');
if (mapEl) observer.observe(mapEl);

// ── Right-click Resolution Badge ──
(function () {
  let badge = null;

  function closeBadge() {
    if (badge) { badge.remove(); badge = null; }
  }

  mapEl.addEventListener('contextmenu', e => {
    e.preventDefault();
    closeBadge();

    let clickedMap = main_map;
    if      (e.target.closest('#alaska-inset'))        clickedMap = alaska_map;
    else if (e.target.closest('#hawaii-inset'))        clickedMap = hawaii_map;
    else if (e.target.closest('#samoa-inset'))         clickedMap = samoa_map;
    else if (e.target.closest('#marianas-inset'))      clickedMap = marianas_map;
    else if (e.target.closest('#virgin-islands-inset'))clickedMap = virgin_islands_map;
    const zoom = clickedMap.getView().getZoom().toFixed(1);

    const mapElRect = clickedMap.getTargetElement().getBoundingClientRect();
    const pixel = [e.clientX - mapElRect.left, e.clientY - mapElRect.top];
    const coord = clickedMap.getCoordinateFromPixel(pixel);
    const lonLat = ol.proj.toLonLat(coord);
    const lat = lonLat[1].toFixed(5);
    const lon = lonLat[0].toFixed(5);
    const coordText = `${lat}, ${lon}`;

    badge = document.createElement('div');
    badge.className = 'map-res-badge';
    const coordSpan = document.createElement('span');
    coordSpan.style.cursor = 'pointer';
    coordSpan.title = 'Click to copy';
    coordSpan.textContent = `Coordinates: ${coordText}`;
    coordSpan.addEventListener('click', e => {
      e.stopPropagation();
      navigator.clipboard.writeText(coordText);
      closeBadge();
    });
    const zoomSpan = document.createElement('span');
    zoomSpan.textContent = `Zoom Level: ${zoom}`;
    badge.appendChild(coordSpan);
    badge.appendChild(zoomSpan);

    badge.style.left       = e.clientX + 'px';
    badge.style.top        = e.clientY + 'px';
    badge.style.visibility = 'hidden';
    document.body.appendChild(badge);

    requestAnimationFrame(() => {
      const r = badge.getBoundingClientRect();
      if (r.right  > window.innerWidth)  badge.style.left = (e.clientX - r.width)  + 'px';
      if (r.bottom > window.innerHeight) badge.style.top  = (e.clientY - r.height) + 'px';
      badge.style.visibility = '';
    });
  });

  // Dismiss on the same events that close the native context menu
  document.addEventListener('click',   closeBadge);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeBadge(); });
  window.addEventListener('blur',      closeBadge);
})();
