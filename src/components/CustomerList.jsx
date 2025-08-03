import { useEffect, useState } from "react";
import axios from "axios";

export default function CustomerList() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/applicants")
      .then(res => {
        setApplicants(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load applicants");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading applicants...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Driver Applicants (Customers)</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {applicants.map((applicant) => (
          <div key={applicant._id} className="bg-white p-4 rounded shadow hover:scale-105 transform transition">
            <h3 className="text-xl font-bold">{applicant.name}</h3>
            <p>Experience: {applicant.experience} years</p>
            <p>Phone: {applicant.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
