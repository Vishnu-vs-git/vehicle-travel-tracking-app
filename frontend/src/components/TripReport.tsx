// src/components/TripReport.tsx

import type { Trip } from "../types/tripTypes";


interface TripReportProps {
  trip: Trip;
}

const TripReport = ({ trip }: TripReportProps) => (
  <div>
    <h3>Trip Report</h3>
    <p>Total Distance: {(trip.totalDistance / 1000).toFixed(2)} km</p>
    <p>Idling Time: {trip.idleTime} sec</p>
    <p>Stoppage Time: {trip.stoppageTime} sec</p>
  </div>
);

export default TripReport;
