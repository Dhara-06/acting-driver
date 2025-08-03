import { useState } from "react";
import axios from "axios";
import { forwardGeocode, reverseGeocode } from "../utils/geocode";

export default function DriverApplicationForm() {
  const [form, setForm] = useState({ name: "", experience: "", phone: "" });
  const [message, setMessage] = useState("");
  const [coords, setCoords]= useState(null);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords([longitude, latitude]);
        // Reverse geocode to get city/town name
        const placeName = await reverseGeocode(latitude, longitude);
        setForm(f => ({ ...f, locationName: placeName }));
      }, () => {
        setMessage("Failed to detect location.");
      });
    } else {
      setMessage("Geolocation not supported.");
    }
  };


  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");

     let locationObj;
  if (coords) {
    locationObj = { type: "Point", coordinates: coords };
  } else if (form.locationName) {
    // Use forwardGeocode to get lat/lon from locationName before submit
    try {
      const geo = await forwardGeocode(form.locationName);
      locationObj = { type: "Point", coordinates: [geo.longitude, geo.latitude] };
    } catch {
      setMessage("Invalid location name.");
      return;
    }
  } else {
    setMessage("Please provide a location or detect your location.");
    return;
  }
    // If coordinates not set (user didn't click detect), use only the name
    // Otherwise, submit both name and coordinates
    const payload = {
      ...form,
      location: coords ? { type: "Point", coordinates: coords } : undefined,
    };
    try {
      await axios.post("http://localhost:5000/api/drivers", payload);
      setMessage("Application submitted!");
      setForm({ name: "", experience: "", phone: "", locationName: "" });
      setCoords(null);
    } catch {
      setMessage("Submission failed.");
    }
  };




  return (
   <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-4">Apply as a Driver</h2>
      <input className="w-full border p-2" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
      <input className="w-full border p-2" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
      <input className="w-full border p-2" name="experience" placeholder="Experience (years)" value={form.experience} onChange={handleChange} required />

      <div className="flex items-center gap-2">
        <input
          className="w-full border p-2"
          name="locationName"
          placeholder="Your Location (e.g., Dindigul, Madurai)"
          value={form.locationName}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          className="bg-green-500 text-white px-3 py-2 rounded"
          onClick={handleDetectLocation}
        >Detect My Location</button>
      </div>

      <button className="bg-blue-600 text-white px-6 py-2 rounded" type="submit">Submit</button>
      {message && <div className="mt-3">{message}</div>}
    </form>
  );
}
