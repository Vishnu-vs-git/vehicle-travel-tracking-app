

import type { Trip } from "../types/tripTypes";

interface TripListProps {
  trips: Trip[];
  onSelect: (trip: Trip) => void;
}

const TripList = ({ trips, onSelect }: TripListProps) => (
  <div>
    <h3>Uploaded Trips</h3>
    {trips.map((trip) => (
      <div key={trip.id} onClick={() => onSelect(trip)}>
        Trip: {new Date(trip.startTime).toLocaleString()}
      </div>
    ))}
  </div>
);

export default TripList;
