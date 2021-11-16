// import * as util from '../src/utils.js'

const { PI, atan, atan2, cos, floor, log, pow, sin, sinh, sqrt, tan, abs } =
  Math;
const radians = (degrees) => (degrees * PI) / 180;
const degrees = (radians) => (radians * 180) / PI;

// Tile Helpers http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
export function lonz2x(lon, z) {
  return floor(((lon + 180) / 360) * pow(2, z));
}
export function latz2y(lat, z) {
  const latRads = radians(lat);
  return floor((1 - log(tan(latRads) + 1 / cos(latRads)) / PI) * pow(2, z - 1));
}
export function lonlatz2xy(lon, lat, z) {
  return [this.lonz2x(lon, z), this.latz2y(lat, z)];
}
export function lonlatz2xyz(lon, lat, z) {
  return [this.lonz2x(lon, z), this.latz2y(lat, z), z];
}

export function xz2lon(x, z) {
  return (x / pow(2, z)) * 360 - 180;
}
export function yz2lat(y, z) {
  const rads = atan(sinh(PI - (2 * PI * y) / pow(2, z)));
  return degrees(rads);
}
export function xyz2lonlat(x, y, z) {
  return [this.xz2lon(x, z), this.yz2lat(y, z)];
}
// Return two lon/lat points for bbox of tile
// We use the usual convention of
//   [minX, minY, maxX, maxY] or [west, south, east, north]
export function xyz2bbox(x, y, z) {
  const [west, north] = this.xyz2lonlat(x, y, z);
  const [east, south] = this.xyz2lonlat(x + 1, y + 1, z);
  return [west, south, east, north];
}
export function lonLatz2bbox(lon, lat, z) {
  const [x, y] = this.lonlatz2xy(lon, lat, z);
  return this.xyz2bbox(x, y, z);
}

export function xyz2zxy(xyz) {
  const [x, y, z] = xyz;
  return [z, x, y];
}
export function lonlat2latlon(lonlat) {
  const [lon, lat] = lonlat;
  return [lat, lon];
}

export function bboxCenter(bbox, type = "lonlat") {
  const [west, south, east, north] = bbox;
  let center = [(west + east) / 2, (south + north) / 2];
  if (type !== "lonlat") center = lonlat2latlon(center);
  return center;
}

export function bboxSize(bbox) {
  const [west, south, east, north] = bbox;
  const width = abs(west - east);
  const height = abs(north - south);
  return [width, height];
}
export function bboxAspect(bbox) {
  const [width, height] = bboxSize(bbox);
  return width / height;
}
export function bboxMetricSize(bbox) {
  const [west, south, east, north] = bbox;
  const topLeft = [west, north];
  const botLeft = [west, south];
  const topRight = [east, north];
  const width = lonLat2meters(topLeft, topRight);
  const height = lonLat2meters(topLeft, botLeft);
  return [width, height];
}
export function bboxMetricAspect(bbox) {
  const [width, height] = bboxMetricSize(bbox);
  return width / height;
}

export function bboxCoords(bbox, type = "lonlat") {
  const [west, south, east, north] = bbox;
  let coords = [
    [west, north], // topLeft
    [east, north], // topRight
    [east, south], // botRight
    [west, south], // botLeft
  ];
  if (type !== "lonlat") coords = coords.map((coord) => lonlat2latlon(coord));
  return coords;
}
export function bboxBounds(bbox, type = "lonlat") {
  const [west, south, east, north] = bbox;
  let coords = [
    [west, north], // topLeft
    [east, south], // botRight
  ];
  if (type !== "lonlat") coords = coords.map((coord) => lonlat2latlon(coord));
  return coords;
}

// Create a url for OSM json data.
// https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL
// south, west, north, east = minLat, minLon, maxLat, maxLon
export function getOsmURL(south, west, north, east) {
  const url = "https://overpass-api.de/api/interpreter?data=";
  const params = `\
[out:json][timeout:180][bbox:${south},${west},${north},${east}];
way[highway];
(._;>;);
out;`;
  return url + encodeURIComponent(params);
}

// https://stackoverflow.com/questions/639695/how-to-convert-latitude-or-longitude-to-meters
// Explanation: https://en.wikipedia.org/wiki/Haversine_formula
export function lonLat2meters(pt1, pt2) {
  const [lon1, lat1] = pt1.map((val) => radians(val)); // lon/lat radians
  const [lon2, lat2] = pt2.map((val) => radians(val));

  // generally used geo measurement function
  const R = 6378.137; // Radius of earth in KM
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;
  const a = sin(dLat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dLon / 2) ** 2;
  // pow(sin(dLat / 2), 2) +
  // cos(lat1) * cos(lat2) * sin(dLon / 2) * sin(dLon / 2)
  const c = 2 * atan2(sqrt(a), sqrt(1 - a));
  const d = R * c;
  return d * 1000; // meters
}

// https://github.com/leaflet-extras/leaflet-providers/blob/master/leaflet-providers.js
export function attribution(who = "osm") {
  const prefix = "Map data &copy; ";
  switch (who) {
    case "osm":
      return prefix + '<a href="https://openstreetmap.org">OpenStreetMap</a>';
    case "topo":
      return prefix + '<a https://opentopomap.org">OpenTopoMap</a>';
    case "smooth":
      return prefix + '<a href="https://stadiamaps.com/">Stadia Maps</a>';
  }
}
export function template(who = "osm") {
  switch (who) {
    case "osm":
      return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    case "topo":
      return "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";
    case "smooth":
      return "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png";
  }
}
