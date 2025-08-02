import { useState } from "react";
import axios from "axios";

export default function BookingForm() {
  const [form, setForm] = useState({ name: "", phone: "", date: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/bookings", form);
      setMessage("Booking submitted!");
      setForm({ name: "", phone: "", date: "" });
    } catch (err) {
      setMessage("Booking failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-4">Book a Driver</h2>
      <input className="w-full border p-2" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
      <input className="w-full border p-2" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
      <input className="w-full border p-2" name="date" type="date" placeholder="Date" value={form.date} onChange={handleChange} required />
      <button className="bg-blue-600 text-white px-6 py-2 rounded" type="submit">Book Driver</button>
      {message && <div>{message}</div>}
    </form>
  );
}
