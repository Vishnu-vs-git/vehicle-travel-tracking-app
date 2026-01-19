// src/components/TripReport.tsx
import type { Trip } from "../types/tripTypes";

interface TripReportProps {
  trip: Trip;
}

const TripReport = ({ trip }: TripReportProps) => {
  const distanceKm = (trip.totalDistance / 1000).toFixed(2);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 space-y-4">
      {/* Header */}
      <div className="border-b pb-3">
        <h3 className="text-sm font-semibold text-gray-700">
          Trip Summary
        </h3>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Distance */}
        <MetricCard
          label="Total Distance"
          value={`${distanceKm} km`}
        />

        {/* Idle Time */}
        <MetricCard
          label="Idling Time"
          value={`${trip.idleTime} sec`}
        />

        {/* Stoppage Time */}
        <MetricCard
          label="Stoppage Time"
          value={`${trip.stoppageTime} sec`}
        />
      </div>
    </div>
  );
};

export default TripReport;

/* ---------- Sub Component ---------- */

interface MetricCardProps {
  label: string;
  value: string;
}

const MetricCard = ({ label, value }: MetricCardProps) => (
  <div className="rounded-lg bg-gray-50 border border-gray-200 p-4 text-center">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="mt-1 text-lg font-semibold text-gray-800">
      {value}
    </p>
  </div>
);
