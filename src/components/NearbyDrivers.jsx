import { useState } from "react";
import axios from "axios";
import { forwardGeocode } from "../utils/geocode";

export default function NearbyDrivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPlace, setSearchPlace] = useState("");

  // Search by city
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const geo = await forwardGeocode(searchPlace);
      const res = await axios.get("http://localhost:5000/api/drivers/near", {
        params: {
          lat: geo.latitude,
          lon: geo.longitude,
          maxDistance: 10000,
        }
      });
      setDrivers(res.data);
    } catch {
      alert("Place not found.");
    }
    setLoading(false);
  };

  // Auto-detect location
  const findNearby = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await axios.get("http://localhost:5000/api/drivers/near", {
            params: {
              lat: latitude,
              lon: longitude,
              maxDistance: 10000,
            }
          });
          setDrivers(res.data);
        } catch {
          alert("Failed to fetch drivers.");
        }
        setLoading(false);
      },
      () => {
        alert("Location permission denied.");
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="Enter city/area (e.g. Dindigul)"
          value={searchPlace}
          onChange={e => setSearchPlace(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
        <button type="button" className="bg-green-500 text-white px-4 py-2 rounded" onClick={findNearby}>Use My Location</button>
      </form>

      {loading && <p>Loading...</p>}
      <div className="grid gap-4 md:grid-cols-3">
        {drivers.map(driver => (
          <div key={driver._id} className="bg-white p-4 rounded shadow">
            <h3>{driver.name}</h3>
            <p>Experience: {driver.experience} years</p>
            <p>Phone: {driver.phone}</p>
            <p>Location: {driver.locationName || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
