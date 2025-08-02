import { useState } from "react";
import axios from "axios";

export default function DriverApplicationForm() {
  const [form, setForm] = useState({ name: "", experience: "", phone: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/drivers", form);
      setMessage("Application submitted!");
      setForm({ name: "", experience: "", phone: "" });
    } catch (err) {
      setMessage("Submission failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-4">Apply as a Driver</h2>
      <input className="w-full border p-2" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
      <input className="w-full border p-2" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
      <input className="w-full border p-2" name="experience" placeholder="Experience (years)" value={form.experience} onChange={handleChange} required />
      <button className="bg-blue-600 text-white px-6 py-2 rounded" type="submit">Submit</button>
      {message && <div>{message}</div>}
    </form>
  );
}
