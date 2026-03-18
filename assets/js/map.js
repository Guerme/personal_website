// Missoula, Montana coordinates
const MISSOULA_LON = -113.9970;
const MISSOULA_LAT = 46.8721;

// Convert to OpenLayers' default projection (EPSG:3857 Web Mercator)
const missoulaCoords = ol.proj.fromLonLat([MISSOULA_LON, MISSOULA_LAT]);

// ── Basemap Layer (OpenStreetMap) ──
const osmLayer = new ol.layer.Tile({
  source: new ol.source.OSM(),
});

// ── Custom Marker ──
const markerEl = document.createElement('div');
markerEl.className = 'map-marker';

const markerOverlay = new ol.Overlay({
  position: missoulaCoords,
  positioning: 'center-center',
  element: markerEl,
  stopEvent: false,
});

// ── Map ──
const map = new ol.Map({
  target: 'map',
  layers: [osmLayer],
  overlays: [markerOverlay],
  view: new ol.View({
    center: missoulaCoords,
    zoom: 12,
    minZoom: 5,
    maxZoom: 18,
  }),
  controls: ol.control.defaults.defaults({
    attributionOptions: { collapsible: false },
  }),
});

// ── Popup on marker click ──
const popupEl = document.createElement('div');
popupEl.style.cssText = `
  background: rgba(255,255,255,0.95);
  border: 1px solid #e8c4a0;
  border-radius: 10px;
  padding: 8px 14px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: #1a1612;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  white-space: nowrap;
  transform: translate(-50%, -120%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
`;
popupEl.innerHTML = `<strong style="color:#c97d4e">Missoula, MT</strong><br>The Garden City 🏔`;

const popupOverlay = new ol.Overlay({
  position: missoulaCoords,
  positioning: 'center-center',
  element: popupEl,
  stopEvent: false,
});
map.addOverlay(popupOverlay);

// Show popup after short delay on load
setTimeout(() => { popupEl.style.opacity = '1'; }, 800);

// Toggle popup on marker click
markerEl.addEventListener('click', () => {
  popupEl.style.opacity = popupEl.style.opacity === '0' ? '1' : '0';
});

// Smooth scroll reveal for map card
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      map.updateSize(); // ensure map renders correctly when visible
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

const mapEl = document.getElementById('map');
if (mapEl) observer.observe(mapEl);
