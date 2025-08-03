// src/utils/geocode.js
export async function reverseGeocode(lat, lon) {
  // Using Nominatim for demonstration (open/free API)
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.address.city || data.address.town || data.address.village || data.display_name;
}
// Forward geocoding: city name => lat/lon
export async function forwardGeocode(place) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;
  const res = await fetch(url);
  const results = await res.json();
  if (results[0]) {
    return {
      latitude: parseFloat(results[0].lat),
      longitude: parseFloat(results[0].lon),
      displayName: results[0].display_name
    };
  }
  throw new Error("Place not found");
}
