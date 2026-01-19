import { useEffect, useState } from "react";
import type { GpsPoint } from "../../types/gpsTypes";
import type { Trip } from "../../types/tripTypes";

interface Props {
  points: GpsPoint[];
  trip: Trip;
}

const PAGE_SIZE = 5; 

const TripTable = ({ points, trip }: Props) => {
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetch = async () => {

      setPage(1);
    }
    fetch();
  }, [trip.id]);

  const totalPages = Math.ceil(points.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const visiblePoints = points.slice(startIndex, endIndex);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* LEFT: TABLE */}
        <div className="lg:col-span-2 overflow-x-auto">
          <table className="w-full text-sm text-white">
            <thead className="sticky top-0 bg-white/10 backdrop-blur text-slate-300">
              <tr>
                <th className="p-4 text-left">Time</th>
                <th className="p-4 text-left">Point</th>
                <th className="p-4 text-center">Ignition</th>
                <th className="p-4 text-center">Speed</th>
              </tr>
            </thead>
            <tbody>
              {visiblePoints.map((p, i) => (
                <tr
                  key={startIndex + i}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-4 text-slate-200">
                    {new Date(p.timeStamp).toLocaleTimeString()}
                  </td>

                  <td className="p-4 text-slate-400">
                    {p.latitude.toFixed(4)}, {p.longitude.toFixed(4)}
                  </td>

                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        p.ignition
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-rose-500/15 text-rose-400"
                      }`}
                    >
                      {p.ignition ? "ON" : "OFF"}
                    </span>
                  </td>

                  <td className="p-4 text-center font-medium">
                    {p.speed.toFixed(1)} km/h
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION CONTROLS */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
            <span className="text-sm text-slate-400">
              Page {page} of {totalPages || 1}
            </span>

            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-40"
              >
                Prev
              </button>

              <button
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: STATUS SUMMARY */}
        <div className="border-t lg:border-t-0 lg:border-l border-white/10 p-6 space-y-4 bg-linear-to-br from-white/5 to-white/0">
          <SummaryRow
            label="Travel Duration"
            value={`${Math.floor(trip.tripDuration / 60)} mins`}
          />
          <SummaryRow
            label="Stopped Duration"
            value={`${Math.floor(trip.stoppageTime / 60)} mins`}
          />
          <SummaryRow
            label="Total Distance"
            value={`${(trip.totalDistance / 1000).toFixed(1)} km`}
          />
          <SummaryRow
            label="Overspeed Duration"
            value={`${Math.floor(trip.overSpeedTime / 60)} mins`}
          />
        </div>
      </div>
    </div>
  );
};

const SummaryRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="flex justify-between items-center">
    <span className="text-slate-400 text-sm">{label}</span>
    <span className="text-white font-semibold">{value}</span>
  </div>
);

export default TripTable;
