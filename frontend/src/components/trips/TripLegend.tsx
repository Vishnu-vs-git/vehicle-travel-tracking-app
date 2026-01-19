// src/components/trips/TripLegend.tsx
const TripLegend = () => (
  <div className="flex gap-6 text-sm text-white">
    <span className="flex items-center gap-2">
      <span className="w-3 h-3 bg-blue-700 rounded-full" />
      Stopped
    </span>
    <span className="flex items-center gap-2">
      <span className="w-3 h-3 bg-pink-600 rounded-full" />
      Idle
    </span>
    <span className="flex items-center gap-2">
      <span className="w-3 h-3 bg-green-500 rounded-full" />
      Over speeding
    </span>
  </div>
);

export default TripLegend;
