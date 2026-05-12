// mexico-poly.js — High-fidelity Mexico boundary polygon (~70 lat/lng points)
// Used by the globe to highlight Mexico's actual shape, and by the map SVG
// to draw the silhouette with state-accurate proportions.
//
// Polygon is closed, clockwise. Mainland only (Baja is a second polygon).

window.MEXICO_MAINLAND_LATLNG = [
  // Northern border, W to E (US/Mexico)
  [32.53, -117.12], // Tijuana corner
  [32.65, -114.72], // Yuma area
  [31.33, -111.07],
  [31.33, -109.05],
  [31.78, -106.53], // El Paso area
  [29.78, -104.69],
  [28.97, -103.27],
  [29.27, -101.40],
  [27.50, -99.50],  // Laredo
  [25.95, -97.15],  // Matamoros (Gulf)

  // Gulf coast going SE then E
  [24.20, -97.85],
  [22.30, -97.86],  // Tampico
  [21.00, -97.40],  // Tuxpan
  [19.20, -96.10],  // Veracruz
  [18.50, -95.10],
  [18.65, -93.90],
  [18.55, -92.65],  // Frontera
  [18.55, -91.40],

  // Yucatan peninsula
  [19.80, -90.55],  // Campeche
  [21.00, -90.30],
  [21.55, -88.80],  // Progreso area
  [21.60, -86.80],  // Cabo Catoche tip
  [21.05, -86.78],  // Cancún
  [20.20, -87.45],  // Tulum
  [18.50, -87.85],
  [18.50, -88.30],  // Chetumal (Belize border)

  // Belize → Guatemala southern border
  [17.80, -89.15],
  [16.50, -89.20],
  [16.07, -90.40],
  [15.95, -91.45],
  [15.20, -92.20],  // Tapachula area (Guate Pacific border)
  [14.55, -92.25],

  // Pacific coast going N
  [15.65, -93.85],
  [16.20, -95.15],  // Salina Cruz
  [16.50, -97.00],
  [16.85, -99.90],  // Acapulco
  [17.95, -102.20], // Lázaro Cárdenas
  [19.05, -104.30], // Manzanillo
  [20.60, -105.25], // Puerto Vallarta
  [22.50, -105.70],
  [23.20, -106.40], // Mazatlán
  [25.55, -109.05], // Topolobampo
  [27.92, -110.90], // Guaymas
  [29.30, -112.20],
  [30.55, -113.10],
  [31.30, -113.55], // Puerto Peñasco
  [31.85, -114.80], // Top of Sea of Cortez
  [32.53, -115.30], // Mexicali
  [32.53, -117.12], // Close
];

window.MEXICO_BAJA_LATLNG = [
  [32.53, -117.12], // NW Tijuana
  [30.20, -115.85],
  [27.70, -115.10],
  [26.10, -112.40],
  [24.10, -110.70],
  [22.93, -109.95], // Cabo
  [23.40, -109.45],
  [24.15, -110.30], // La Paz bay
  [25.50, -111.30],
  [27.30, -112.40],
  [28.00, -112.95],
  [30.00, -114.30],
  [31.60, -114.65],
  [31.85, -114.80],
  [32.53, -115.30],
  [32.53, -117.12], // close
];

// Inside-polygon test (lat,lng-aware via simple ray casting).
window.pointInPolygon = function(lat, lng, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [yi, xi] = poly[i];
    const [yj, xj] = poly[j];
    const intersect = ((yi > lat) !== (yj > lat)) &&
      (lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
};

window.isInMexico = function(lat, lng) {
  return window.pointInPolygon(lat, lng, window.MEXICO_MAINLAND_LATLNG)
      || window.pointInPolygon(lat, lng, window.MEXICO_BAJA_LATLNG);
};

// Projection helper: lat/lng → viewBox x/y for the SVG map (1000 × 620).
// Uses a simple equirectangular projection with cos-lat correction at mid-latitude.
window.MX_VIEWBOX = { w: 1000, h: 620 };
const MX_BOUNDS = { latN: 33.5, latS: 13.5, lngW: -118.5, lngE: -85.5 };
const MX_MIDLAT = (MX_BOUNDS.latN + MX_BOUNDS.latS) / 2;
const MX_COS = Math.cos(MX_MIDLAT * Math.PI / 180);

window.projectLatLng = function(lat, lng) {
  // Equirectangular with longitude scaled by cos(midLat)
  const dx = (lng - MX_BOUNDS.lngW) * MX_COS;
  const totalDx = (MX_BOUNDS.lngE - MX_BOUNDS.lngW) * MX_COS;
  const x = (dx / totalDx) * window.MX_VIEWBOX.w;
  const y = ((MX_BOUNDS.latN - lat) / (MX_BOUNDS.latN - MX_BOUNDS.latS)) * window.MX_VIEWBOX.h;
  return [x, y];
};

window.polyToPath = function(poly) {
  let d = '';
  poly.forEach(([lat, lng], i) => {
    const [x, y] = window.projectLatLng(lat, lng);
    d += (i === 0 ? 'M ' : 'L ') + x.toFixed(2) + ' ' + y.toFixed(2) + ' ';
  });
  return d + 'Z';
};
