import React, { useState } from "react";
import Navbar from "./components/Navbar";
import DriverApplicationForm from "./components/DriverApplicationForm";
import DriverList from "./components/DriverList";
import BookingForm from "./components/BookingForm";
import CustomerList from "./components/CustomerList";  // import new component
import NearbyDrivers from "./components/NearbyDrivers";

function App() {
  const [view, setView] = useState("drivers");

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setView={setView} />
      <div className="container mx-auto p-6">
        {view === "drivers" && <DriverList />}
        {view === "apply" && <DriverApplicationForm />}
        {view === "book" && <BookingForm />}
        {view === "applicants" && <CustomerList />} {/* New route */}
        {view === "nearby" && <NearbyDrivers />}
      </div>
    </div>
  );
}

export default App;
