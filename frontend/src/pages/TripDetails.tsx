import { useEffect, useState } from "react";
import type { Trip } from "../types/tripTypes";
import type { GpsPoint } from "../types/gpsTypes";
import { TripService } from "../services/tripService";

import TripMap from "../components/trips/TripMap";
import TripStats from "../components/trips/TripStats";
import TripTable from "../components/trips/TripTable";
import TripLegend from "../components/trips/TripLegend";
import TripTabs from "../components/trips/TripTabs";
import TripSelector from "../components/trips/TripSelector";
import { useNavigate } from "react-router-dom";


const TripDetails = () => {
  const [allTrips, setAllTrips] = useState<Trip[]>([]);
  const [tripPointsMap, setTripPointsMap] = useState<Record<string, GpsPoint[]>>(
    {}
  );

  const [activeTripId, setActiveTripId] = useState<string | null>(null);
  const [selectedTripIds, setSelectedTripIds] = useState<string[]>([]);
  const navigate = useNavigate();


 
  useEffect(() => {
    const loadTrips = async () => {
      const res = await TripService.getTrips();
      const trips = res.data.data;

      setAllTrips(trips);
      if (trips.length > 0) {
        setActiveTripId(trips[0].id);
        setSelectedTripIds([trips[0].id]); 
      }
    };

    loadTrips();
  }, []);

  
  useEffect(() => {
    selectedTripIds.forEach((tripId) => {
      if (tripPointsMap[tripId]) return;

      TripService.getTripDetails(tripId).then((res) => {
        setTripPointsMap((prev) => ({
          ...prev,
          [tripId]: res.data.data,
        }));
      });
    });
  }, [selectedTripIds, tripPointsMap]);


  const tripsForMap = selectedTripIds
    .filter((id) => tripPointsMap[id])
    .map((id) => ({
      tripId: id,
      points: tripPointsMap[id],
    }));

  const activeTrip = allTrips.find((t) => t.id === activeTripId) ?? null;
  const activePoints =
    activeTripId && tripPointsMap[activeTripId]
      ? tripPointsMap[activeTripId]
      : [];

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Trips</h1>
      <div className="flex items-center gap-4">
  <button
    onClick={() => navigate("/dashboard")}
    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition"
  >
    ← Back
  </button>

  <h1 className="text-2xl font-semibold">Trips</h1>
</div>


      {/* MULTI-TRIP SELECTOR */}
      <TripSelector
        trips={allTrips}
        selectedTripIds={selectedTripIds}
        onChange={setSelectedTripIds}
      />

      {/* MAP */}
      <TripLegend />
      <TripMap trips={tripsForMap} />

      {/* TABS (active trip details) */}
      <TripTabs
        trips={allTrips.map((t) => ({
          id: t.id,
          name: t.name,
        }))}
        activeTripId={activeTripId}
        onSelect={setActiveTripId}
      />

      {/* STATS */}
      {activeTrip && <TripStats trip={activeTrip} />}

      {/* TABLE */}
      {activeTrip && activePoints.length > 0 && (
        <TripTable
          key={activeTrip.id}
          points={activePoints}
          trip={activeTrip}
        />
      )}
    </div>
  );
};

export default TripDetails;
