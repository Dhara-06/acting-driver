export default function Navbar({ setView }) {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div
        className="text-xl font-bold cursor-pointer hover:text-gray-200 transition"
        onClick={() => setView("drivers")}
      >
        Acting Driver Service
      </div>
      <div>
        <button
          className="mx-2 px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => setView("drivers")}
        >
          Drivers
        </button>
        <button
          className="mx-2 px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => setView("book")}
        >
          Book Now
        </button>
        <button
          className="mx-2 px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => setView("apply")}
        >
          Apply as Driver
        </button>
        <button
          className="mx-2 px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => setView("applicants")}
        >
          Applicants List
        </button>
        <button className="mx-2 px-4 py-2" onClick={() => setView("nearby")}>Drivers Near Me</button>

      </div>
    </nav>
  );
}
