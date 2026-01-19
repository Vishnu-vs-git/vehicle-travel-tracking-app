// src/components/MapView.tsx
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { GpsPoint } from "../types/gpsTypes";

interface MapViewProps {
  points: GpsPoint[];
}

/* ---------- Custom Icons ---------- */
const startIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const endIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const MapView = ({ points }: MapViewProps) => {
  if (!points || points.length === 0) {
    return (
      <div className="rounded-lg border p-4 text-sm text-gray-500">
        No GPS data available for this trip.
      </div>
    );
  }

  const positions: [number, number][] = points.map((p) => [
    p.latitude,
    p.longitude,
  ]);

  const startPoint = points[0];
  const endPoint = points[points.length - 1];

  return (
    <div className="rounded-xl overflow-hidden border shadow-sm">
      <MapContainer
        center={positions[0]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: 420, width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Route */}
        <Polyline
          positions={positions}
          pathOptions={{ color: "#2563eb", weight: 4 }}
        />

        {/* Start Marker */}
        <Marker
          position={[startPoint.latitude, startPoint.longitude]}
          icon={startIcon}
        >
          <Popup>
            <strong>Trip Start</strong>
            <br />
            {new Date(startPoint.timeStamp).toLocaleString()}
          </Popup>
        </Marker>

        {/* End Marker */}
        <Marker
          position={[endPoint.latitude, endPoint.longitude]}
          icon={endIcon}
        >
          <Popup>
            <strong>Trip End</strong>
            <br />
            {new Date(endPoint.timeStamp).toLocaleString()}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
