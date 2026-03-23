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
    center: ol.proj.fromLonLat([-100, 38]),
    zoom: 5.2,
    minZoom: 2,
    maxZoom: 18,
  }),
  controls: ol.control.defaults.defaults({ attributionOptions: { collapsible: false } }),
});

// ── Alaska Inset Map ──
// Wrapper carries the shadow (drop-shadow follows the clipped shape)
const alaska_wrapper = document.createElement('div');
alaska_wrapper.id = 'alaska-inset';
alaska_wrapper.style.cssText = `
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 400px;
  height: 300px;
  z-index: 10;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
`;
main_map.getTargetElement().appendChild(alaska_wrapper);

// Inner div clips to the chamfered shape with rounded corners (r=8)
// 400×300: diagonal cut from (300,0) to (400,75), rounded at the 3 right-angle corners
const alaska_div = document.createElement('div');
alaska_div.style.cssText = `width: 100%; height: 100%; overflow: hidden;`;
alaska_div.style.clipPath = "path('m 8,0 h 234 c 10.08645,0.22903816 13.89497,3.3440934 20.77009,10.705872 " +
                            "L 392.84965,143.09541 c 5.78131,5.61884 5.96965,5.58121 7.29264,13.68914 L 400,292 " +
                            "c -0.005,4.41828 -3.58172,8 -8,8 H 8 c -4.418278,0 -8,-3.58172 -8,-8 V 8 C 0,3.581722 3.581722,0 8,0 Z')";
alaska_wrapper.appendChild(alaska_div);

alaska_map = new ol.Map({
  target: alaska_div,
  layers: [
    new ol.layer.Tile({ source: new ol.source.OSM() }),
    new ol.layer.Vector({ source: vectorSource }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-153, 61]),
    zoom: 3.4,
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
  bottom: 330px;
  left: 20px;
  width: 250px;
  height: 150px;
  z-index: 10;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
`;
main_map.getTargetElement().appendChild(hawaii_wrapper);

const hawaii_div = document.createElement('div');
hawaii_div.style.cssText = `width: 100%; height: 100%; overflow: hidden;`;
hawaii_div.style.clipPath = "path('M 8,0 H 242 A 8,8 0 0 1 250,8 V 142 A 8,8 0 0 1 242,150 H 8 A 8,8 0 0 1 0,142 V 8 A 8,8 0 0 1 8,0 Z')";
hawaii_wrapper.appendChild(hawaii_div);

hawaii_map = new ol.Map({
  target: hawaii_div,
  layers: [
    new ol.layer.Tile({ source: new ol.source.OSM() }),
    new ol.layer.Vector({ source: vectorSource }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-165, 20]),
    zoom: 3.9,
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
  bottom: 490px;
  left: 20px;
  width: 250px;
  height: 150px;
  z-index: 10;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
`;
main_map.getTargetElement().appendChild(samoa_wrapper);

const samoa_div = document.createElement('div');
samoa_div.style.cssText = `width: 100%; height: 100%; overflow: hidden;`;
samoa_div.style.clipPath = "path('M 8,0 H 242 A 8,8 0 0 1 250,8 V 142 A 8,8 0 0 1 242,150 H 8 A 8,8 0 0 1 0,142 V 8 A 8,8 0 0 1 8,0 Z')";
samoa_wrapper.appendChild(samoa_div);

samoa_map = new ol.Map({
  target: samoa_div,
  layers: [
    new ol.layer.Tile({ source: new ol.source.OSM() }),
    new ol.layer.Vector({ source: vectorSource }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-169.7, -14.4]),
    zoom: 7,
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
  left: 430px;
  width: 170px;
  height: 150px;
  z-index: 10;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
`;
main_map.getTargetElement().appendChild(marianas_wrapper);

const marianas_div = document.createElement('div');
marianas_div.style.cssText = `width: 100%; height: 100%; overflow: hidden;`;
marianas_div.style.clipPath = "path('M 8,0 H 162 A 8,8 0 0 1 170,8 V 142 A 8,8 0 0 1 162,150 H 8 A 8,8 0 0 1 0,142 V 8 A 8,8 0 0 1 8,0 Z')";
marianas_wrapper.appendChild(marianas_div);

marianas_map = new ol.Map({
  target: marianas_div,
  layers: [
    new ol.layer.Tile({ source: new ol.source.OSM() }),
    new ol.layer.Vector({ source: vectorSource }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([145, 20]),
    zoom: 7,
    minZoom: 2,
    maxZoom: 14,
  }),
  controls: ol.control.defaults.defaults({ attributionOptions: { collapsible: false } }),
});

const marianas_label = document.createElement('div');
marianas_label.textContent = 'Marianas';
marianas_label.style.cssText = `
  position: absolute;
  bottom: 20px;
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
  bottom: 20px;
  left: 1100px;
  width: 250px;
  height: 120px;
  z-index: 10;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
`;
main_map.getTargetElement().appendChild(virgin_islands_wrapper);

const virgin_islands_div = document.createElement('div');
virgin_islands_div.style.cssText = `width: 100%; height: 100%; overflow: hidden;`;
virgin_islands_div.style.clipPath = "path('M 8,0 H 242 A 8,8 0 0 1 250,8 V 112 A 8,8 0 0 1 242,120 H 8 A 8,8 0 0 1 0,112 V 8 A 8,8 0 0 1 8,0 Z')";
virgin_islands_wrapper.appendChild(virgin_islands_div);

virgin_islands_map = new ol.Map({
  target: virgin_islands_div,
  layers: [
    new ol.layer.Tile({ source: new ol.source.OSM() }),
    new ol.layer.Vector({ source: vectorSource }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-64.7, 18.05]),
    zoom: 7,
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

function buildPopupHTML(feature) {
  const label  = feature.get('type') === 'park' ? 'National Park' : 'National Monument';
  const status = feature.get('visited') ? '✓ Visited' : 'Not yet visited';
  const color  = feature.get('visited')
    ? (feature.get('type') === 'park' ? '#c97d4e' : '#6b9ab8')
    : '#999';
  const website = feature.get('website');
  const websiteLine = website
    ? `<br><a href="${website}" target="_blank" rel="noopener" style="font-size:11px;color:#5a8fa8;text-decoration:none;">Website: ${website}</a>`
    : '';
  return `
    <button onclick="closePopup()" style="position:absolute;top:4px;right:6px;background:none;border:none;cursor:pointer;font-size:14px;color:#999;line-height:1;padding:0;">✕</button>
    <strong>${feature.get('name')} ${label}</strong><br>
    <span style="color:${color};font-size:11px">${status}</span>${websiteLine}
  `;
}

function showPopup(mapInstance, pixel) {
  const mapRect = mapInstance.getTargetElement().getBoundingClientRect();
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
    left >= mapRect.left &&
    left + pw <= mapRect.right &&
    top  >= mapRect.top  &&
    top  + ph <= mapRect.bottom;

  const pos = candidates.find(fits) ?? {
    left: Math.max(mapRect.left, Math.min(candidates[0].left, mapRect.right  - pw)),
    top:  Math.max(mapRect.top,  Math.min(candidates[0].top,  mapRect.bottom - ph)),
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

function registerMapHandlers(mapInstance) {
  mapInstance.on('pointermove', e => {
    const feature = mapInstance.forEachFeatureAtPixel(e.pixel, f => f);
    mapInstance.getTargetElement().style.cursor = feature ? 'pointer' : '';
  });

  mapInstance.on('singleclick', e => {
    const feature = mapInstance.forEachFeatureAtPixel(e.pixel, f => f);
    if (feature) {
      if (selectedFeature && selectedFeature !== feature) closePopup();
      selectedFeature = feature;
      feature.setStyle(getHighlightStyle(feature));
      popupEl.innerHTML          = buildPopupHTML(feature);
      popupEl.style.opacity      = '1';
      popupEl.style.pointerEvents = 'auto';
      requestAnimationFrame(() => showPopup(mapInstance, e.pixel));
    } else {
      closePopup();
    }
  });
}

registerMapHandlers(main_map);
registerMapHandlers(alaska_map);
registerMapHandlers(hawaii_map);
registerMapHandlers(samoa_map);
registerMapHandlers(marianas_map);
registerMapHandlers(virgin_islands_map);

// ── Legend ──
const legend = document.createElement('div');
legend.className = 'map-legend';
legend.innerHTML = `
  <div class="legend-handle" id="legend-handle">
    <span class="legend-title">Legend</span>
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

legend.addEventListener('pointerdown', e => e.stopPropagation());
legend.addEventListener('click',       e => e.stopPropagation());
main_map.getViewport().appendChild(legend);

main_map.once('rendercomplete', () => {
  const pixel = main_map.getPixelFromCoordinate(ol.proj.fromLonLat([-68.8, 34.5]));
  if (pixel) {
    legend.style.right  = 'auto';
    legend.style.bottom = 'auto';
    legend.style.left   = `${pixel[0] - legend.offsetWidth  / 2}px`;
    legend.style.top    = `${pixel[1] - legend.offsetHeight / 2}px`;
  }
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

// ── Render ──
vectorSource.on('change', () => { alaska_map.render(); hawaii_map.render(); samoa_map.render(); marianas_map.render(); virgin_islands_map.render(); });

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
