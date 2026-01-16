// src/components/MapView.tsx
import { MapContainer, TileLayer, Polyline } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import type { GpsPoint } from "../types/gpsTypes";

interface MapViewProps {
  points: GpsPoint[];
}

const MapView = ({ points }: MapViewProps) => {
  const positions: [number, number][] = points.map((p) => [
    p.latitude,
    p.longitude
  ]);

  if (positions.length === 0) {
    return <div>No GPS data available for this trip.</div>;
  }

  return (
    <MapContainer
      center={positions[0]}
      zoom={13}
      style={{ height: 400 }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline positions={positions} />
    </MapContainer>
  );
};

export default MapView;
