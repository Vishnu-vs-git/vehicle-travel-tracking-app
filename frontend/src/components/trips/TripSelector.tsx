import type { Trip } from "../../types/tripTypes";

interface Props {
  trips: Trip[];
  selectedTripIds: string[];
  onChange: (ids: string[]) => void;
}

const TripSelector = ({ trips, selectedTripIds, onChange }: Props) => {
  const toggleTrip = (tripId: string) => {
    if (selectedTripIds.includes(tripId)) {
      onChange(selectedTripIds.filter((id) => id !== tripId));
    } else {
      onChange([...selectedTripIds, tripId]);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-4">
      <h3 className="text-sm font-semibold text-slate-300 mb-3">
        Select trips to display on map
      </h3>

      <div className="flex flex-wrap gap-4">
        {trips.map((trip) => (
          <label
            key={trip.id}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedTripIds.includes(trip.id)}
              onChange={() => toggleTrip(trip.id)}
              className="accent-cyan-400"
            />
            <span className="text-slate-200 truncate max-w-45">
              {trip.name}
            </span>
          </label>
        ))}

        {trips.length === 0 && (
          <p className="text-slate-400 text-sm">No trips available</p>
        )}
      </div>
    </div>
  );
};

export default TripSelector;
