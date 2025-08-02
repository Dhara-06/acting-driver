function Navbar({ setView }) {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold cursor-pointer" onClick={() => setView("drivers")}>
        Acting Driver Service
      </div>
      <div>
        <button className="mx-2 px-4 py-2" onClick={() => setView("drivers")}>Drivers</button>
        <button className="mx-2 px-4 py-2" onClick={() => setView("book")}>Book Now</button>
        <button className="mx-2 px-4 py-2" onClick={() => setView("apply")}>Apply as Driver</button>
      </div>
    </nav>
  );
}

export default Navbar;
