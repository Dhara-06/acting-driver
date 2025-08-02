import { useEffect, useState } from "react";
import axios from "axios";

export default function DriverList() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/drivers").then(res => setDrivers(res.data));
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {drivers.map(driver => (
        <div key={driver._id} className="bg-white p-4 rounded shadow hover:scale-105 transform transition">
          <h3 className="text-xl font-bold">{driver.name}</h3>
          <p>Experience: {driver.experience} years</p>
          <p>Phone: {driver.phone}</p>
        </div>
      ))}
    </div>
  );
}
