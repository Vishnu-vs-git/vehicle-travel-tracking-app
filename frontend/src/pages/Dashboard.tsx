import { useEffect, useState, useCallback } from "react";
import UploadSection from "../components/UploadSection";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/authService";
import { TripService } from "../services/tripService";
import type { Trip } from "../types/tripTypes";

import TripList from "../components/TripList";


const Dashboard = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
 

  const loadTrips = useCallback(async () => {
    try{
      const response = await TripService.getTrips();
      setTrips(response.data.data);
    }catch(err){
      console.error("Error loading trips:", err);
    }
  }, []);

 

  const handleLogout = async () => {
    try {
      await AuthService.logout(); 
      navigate("/");
    } catch {
      navigate("/");
    }
  };
  const deleteTrip = async (tripId: string) => {
  try {
    await TripService.deleteTrip(tripId);
    await loadTrips(); 
  } catch (err) {
    console.error("Failed to delete trip", err);
  }
};


  useEffect(() => {
    const fetchData = async () => {
      await loadTrips();
    };
    fetchData();
  }, [loadTrips]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-black text-white">

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
          <h1 className="text-3xl font-semibold">Welcome User</h1>
          <p className="text-slate-400 mt-1">
            Upload GPS trip data and analyze vehicle movement
          </p>
        </div>

        {/* Upload Section */}
        <UploadSection onUploadSuccess={loadTrips} />

        {/* FUTURE SECTIONS */}
         
       <TripList
  trips={trips}
  onSelect={(trip) => navigate(`/trips/${trip.id}`)}
  onDelete={deleteTrip}
/>

      
        
      </main>
    </div>
  );
};

export default Dashboard;

