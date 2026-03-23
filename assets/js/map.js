// ── Main Map ──
const vectorSource = new ol.source.Vector();
const vectorLayer  = new ol.layer.Vector({ source: vectorSource });
let insetMap;

const map = new ol.Map({
  target: 'map',
  layers: [new ol.layer.Tile({ source: new ol.source.OSM() }), vectorLayer],
  view: new ol.View({
    center: ol.proj.fromLonLat([-98, 39]),
    zoom: 5,
    minZoom: 2,
    maxZoom: 18,
  }),
  controls: ol.control.defaults.defaults({ attributionOptions: { collapsible: false } }),
});

// ── Alaska Inset Map ──
const insetDiv = document.createElement('div');
insetDiv.style.cssText = `
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 230px;
  height: 160px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  z-index: 10;
`;
map.getTargetElement().appendChild(insetDiv);

insetMap = new ol.Map({
  target: insetDiv,
  layers: [
    new ol.layer.Tile({ source: new ol.source.OSM() }),
    new ol.layer.Vector({ source: vectorSource }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-153, 64]),
    zoom: 3,
    minZoom: 2,
    maxZoom: 10,
  }),
  controls: ol.control.defaults.defaults({ attributionOptions: { collapsible: false } }),
});

const insetLabel = document.createElement('div');
insetLabel.textContent = 'Alaska';
insetLabel.style.cssText = `
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
insetMap.getViewport().appendChild(insetLabel);

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

registerMapHandlers(map);
registerMapHandlers(insetMap);

// ── Legend ──
const legendEl = document.createElement('div');
legendEl.className = 'map-legend';
legendEl.innerHTML = `
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

legendEl.addEventListener('pointerdown', e => e.stopPropagation());
legendEl.addEventListener('click',       e => e.stopPropagation());
map.getViewport().appendChild(legendEl);

map.once('rendercomplete', () => {
  const pixel = map.getPixelFromCoordinate(ol.proj.fromLonLat([-132.5, 38]));
  if (pixel) {
    legendEl.style.right  = 'auto';
    legendEl.style.bottom = 'auto';
    legendEl.style.left   = `${pixel[0] - legendEl.offsetWidth  / 2}px`;
    legendEl.style.top    = `${pixel[1] - legendEl.offsetHeight / 2}px`;
  }
});

const dragHandle = document.getElementById('legend-handle');
let dragging = false, dragOffX = 0, dragOffY = 0;

dragHandle.addEventListener('mousedown', e => {
  dragging = true;
  const rect = legendEl.getBoundingClientRect();
  dragOffX = e.clientX - rect.left;
  dragOffY = e.clientY - rect.top;
  e.preventDefault();
});

document.addEventListener('mousemove', e => {
  if (!dragging) return;
  const vp     = map.getViewport();
  const vpRect = vp.getBoundingClientRect();
  let x = e.clientX - vpRect.left - dragOffX;
  let y = e.clientY - vpRect.top  - dragOffY;
  x = Math.max(0, Math.min(x, vpRect.width  - legendEl.offsetWidth));
  y = Math.max(0, Math.min(y, vpRect.height - legendEl.offsetHeight));
  legendEl.style.left   = `${x}px`;
  legendEl.style.top    = `${y}px`;
  legendEl.style.right  = 'auto';
  legendEl.style.bottom = 'auto';
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
  if (insetMap) insetMap.render();
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
  if (insetMap) insetMap.render();
}

// ── Render ──
vectorSource.on('change', () => insetMap.render());

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      map.updateSize();
      insetMap.updateSize();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
const mapEl = document.getElementById('map');
if (mapEl) observer.observe(mapEl);
