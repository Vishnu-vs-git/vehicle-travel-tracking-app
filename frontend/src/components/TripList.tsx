import { useState, useEffect } from "react";
import type { Trip } from "../types/tripTypes";
import { confirmDelete } from "../utils/confirmDelete";

interface Props {
  trips: Trip[];
  onSelect: (trip: Trip) => void;
  onDelete: (tripId: string) => void;
}

const PAGE_SIZE = 5; // adjust if needed

const TripList = ({ trips, onSelect, onDelete }: Props) => {
  const [page, setPage] = useState(1);

  // Reset page when trips change (e.g. after delete or upload)
  useEffect(() => {
    const fetch = async () => {

      setPage(1);
    }
    fetch();
  }, [trips.length]);

  const totalPages = Math.ceil(trips.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const visibleTrips = trips.slice(startIndex, endIndex);

  return (
    <div className="bg-white rounded-lg divide-y">
      {/* LIST */}
      {visibleTrips.map((trip) => (
        <div
          key={trip.id}
          className="flex justify-between items-center px-4 py-3 hover:bg-gray-50"
        >
          <span className="font-medium text-black truncate max-w-55">
            {trip.name}
          </span>

          <div className="flex items-center gap-3">
            {/* DELETE */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                confirmDelete({
                  onConfirm: () => onDelete(trip.id),
                });
              }}
              className="text-gray-400 hover:text-red-500"
              title="Delete trip"
            >
              🗑
            </button>

            {/* VIEW */}
            <button
              onClick={() => onSelect(trip)}
              className="text-gray-400 hover:text-blue-500"
              title="View trip"
            >
              ➤
            </button>
          </div>
        </div>
      ))}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
          <span className="text-sm text-gray-900">
            Page {page} of {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 rounded bg-white text-black border text-sm disabled:opacity-40"
            >
              Prev
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 rounded bg-white border text-black text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripList;
