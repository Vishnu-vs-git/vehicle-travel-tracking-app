interface Props {
  trips: { id: string; name: string }[];
  activeTripId: string | null;
  onSelect: (id: string) => void;
}

const TripTabs = ({ trips, activeTripId, onSelect }: Props) => {
  return (
    <div className="flex gap-6 border-b border-white/10 overflow-x-auto">
      {trips.map((trip) => (
        <button
          key={trip.id}
          onClick={() => onSelect(trip.id)}
          className={`pb-2 text-sm whitespace-nowrap transition
            ${
              activeTripId === trip.id
                ? "border-b-2 border-cyan-400 text-cyan-400"
                : "text-slate-400 hover:text-white"
            }`}
        >
          {trip.name}
        </button>
      ))}
    </div>
  );
};

export default TripTabs;
