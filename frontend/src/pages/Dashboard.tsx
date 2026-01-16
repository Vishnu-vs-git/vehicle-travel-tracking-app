// // import { useEffect, useState } from "react";
// // import UploadSection from "../components/UploadSection";
// // import TripList from "../components/TripList";
// // import MapView from "../components/MapView";
// // import TripReport from "../components/TripReport";
// // import { TripService } from "../services/trip.service";

// import { useEffect } from "react";
// // import type { Trip } from "../types/tripTypes";
// // import type { GpsPoint } from "../types/gpsTypes";
// import UploadSection from "../components/UploadSection";

// const Dashboard = () => {
//   // const [trips, setTrips] = useState<Trip[]>([]);
//   // const [selectedTrip, setSelectedTrip] = useState<Trip|null>(null);
//   // const [gpsPoints, setGpsPoints] = useState<GpsPoint[]>([]);

//   const loadTrips = async () => {
//     // const data = await TripService.getTrips();
//     // setTrips(data);
//   };

//   // const selectTrip = async (trip: any) => {
//   //   setSelectedTrip(trip);
//   //   const gps = await TripService.getTripDetails(trip._id);
//   //   setGpsPoints(gps);
//   // };

//   useEffect(() => {
//     // loadTrips();
//   }, []);
    
//   return (
//     <div>
//       <h2>Dashboard</h2>

//       <UploadSection onUploadSuccess={loadTrips} />

//       {/* <TripList trips={trips} onSelect={selectTrip} />

//       {selectedTrip && (
//         <>
//           <MapView points={gpsPoints} />
//           <TripReport trip={selectedTrip} />
//         </>
//       )} */}
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect } from "react";
import UploadSection from "../components/UploadSection";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/authService";
// import { AuthService } from "../services/authService";

const Dashboard = () => {
  const navigate = useNavigate();

  const loadTrips = async () => {
    // later: fetch trips here
  };

  const handleLogout = async () => {
    try {
       await AuthService.logout(); 
      navigate("/");
    } catch {
      navigate("/");
    }
  };

  useEffect(() => {
    // loadTrips();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10 backdrop-blur-lg bg-black/30">
        {/* Left: App Name */}
        <div className="text-2xl font-bold tracking-wide">
          🚗 <span className="text-cyan-400">Speedo</span>
        </div>

        {/* Right: Logout */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-red-500/90 hover:bg-red-500 text-sm font-semibold transition"
        >
          Logout
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-slate-400 mt-1">
            Upload GPS trip data and analyze vehicle movement
          </p>
        </div>

        {/* Upload Section */}
        <UploadSection onUploadSuccess={loadTrips} />

        {/* FUTURE SECTIONS */}
        {/* 
        <TripList trips={trips} onSelect={selectTrip} />

        {selectedTrip && (
          <>
            <MapView points={gpsPoints} />
            <TripReport trip={selectedTrip} />
          </>
        )} 
        */}
      </main>
    </div>
  );
};

export default Dashboard;

