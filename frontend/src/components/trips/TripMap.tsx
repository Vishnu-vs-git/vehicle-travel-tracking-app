// src/components/trips/TripMap.tsx
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import type { GpsPoint } from "../../types/gpsTypes";
import { buildSegments } from "../../utils/buildSegments";
import type { SegmentType } from "../../utils/buildSegments";
import "leaflet/dist/leaflet.css";

interface TripWithPoints {
  tripId: string;
  points: GpsPoint[];
}

interface Props {
  trips: TripWithPoints[];
}

const colors: Record<SegmentType, string> = {
  normal: "#2563eb",    // blue
  idle: "#f59e0b",      // orange
  overspeed: "#22c55e", // green
  stopped: "#ef4444",   // red
};

const icons = {
  stopped: new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    iconSize: [32, 32],
  }),
  idle: new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
    iconSize: [32, 32],
  }),
  overspeed: new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    iconSize: [32, 32],
  }),
};

const TripMap = ({ trips }: Props) => {
  if (!trips.length) return null;

  const firstTrip = trips[0];
  const center: [number, number] = [
    firstTrip.points[0].latitude,
    firstTrip.points[0].longitude,
  ];

  return (
    <div className="rounded-xl overflow-hidden border border-white/10">
      <MapContainer center={center} zoom={13} className="h-125">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {trips.map((trip, index) => {
          const segments = buildSegments(trip.points);
          const start = trip.points[0];
          const end = trip.points[trip.points.length - 1];

          return (
            <div key={trip.tripId}>
              {/* POLYLINES (NO STOPPED) */}
              {segments
                .filter(s => s.type !== "stopped")
                .map((s, i) => (
                  <Polyline
                    key={`${trip.tripId}-line-${i}`}
                    positions={s.points}
                    pathOptions={{
                      color: colors[s.type],
                      weight: 5,
                    }}
                  />
                ))}

              {/* START */}
              <Marker position={[start.latitude, start.longitude]}>
                <Popup>🚀 Trip {index + 1} Start</Popup>
              </Marker>

              {/* END */}
              <Marker position={[end.latitude, end.longitude]}>
                <Popup>🏁 Trip {index + 1} End</Popup>
              </Marker>

              {/* STOPPED MARKERS */}
              {segments
                .filter(s => s.type === "stopped")
                .map((s, i) => {
                  const [lat, lng] = s.points[0];
                  return (
                    <Marker
                      key={`stop-${trip.tripId}-${i}`}
                      position={[lat, lng]}
                      icon={icons.stopped}
                    >
                      <Popup>🔴 Stopped</Popup>
                    </Marker>
                  );
                })}

              {/* IDLE MARKERS */}
              {segments
                .filter(s => s.type === "idle")
                .map((s, i) => {
                  const [lat, lng] = s.points[0];
                  return (
                    <Marker
                      key={`idle-${trip.tripId}-${i}`}
                      position={[lat, lng]}
                      icon={icons.idle}
                    >
                      <Popup>🟠 Idle</Popup>
                    </Marker>
                  );
                })}

              {/* OVERSPEED MARKERS */}
              {segments
                .filter(s => s.type === "overspeed")
                .map((s, i) => {
                  const [lat, lng] = s.points[0];
                  return (
                    <Marker
                      key={`over-${trip.tripId}-${i}`}
                      position={[lat, lng]}
                      icon={icons.overspeed}
                    >
                      <Popup>🚨 Overspeed</Popup>
                    </Marker>
                  );
                })}
            </div>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default TripMap;
