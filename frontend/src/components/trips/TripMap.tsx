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
import "leaflet/dist/leaflet.css";

interface TripWithPoints {
  tripId: string;
  points: GpsPoint[];
}

interface Props {
  trips: TripWithPoints[];
}

const colors = {
  normal: "#2563eb",
  stopped: "#1d4ed8",
  idle: "#db2777",
  overspeed: "#22c55e",
};

const icons = {
  stopped: new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    iconSize: [32, 32],
  }),
  idle: new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/pink-dot.png",
    iconSize: [32, 32],
  }),
  overspeed: new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    iconSize: [32, 32],
  }),
};

const TripMap = ({ trips }: Props) => {
  if (!trips.length) return null;

  // Center map using FIRST trip
  const firstTrip = trips[0];
  const center = [
    firstTrip.points[0].latitude,
    firstTrip.points[0].longitude,
  ] as [number, number];

  return (
    <div className="rounded-xl overflow-hidden border border-white/10">
      <MapContainer center={center} zoom={14} className="h-125">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {trips.map((trip, tripIndex) => {
          if (!trip.points.length) return null;

          const segments = buildSegments(trip.points);
          const start = trip.points[0];
          const end = trip.points[trip.points.length - 1];

          return (
            <div key={trip.tripId}>
              {/* ROUTE SEGMENTS */}
              {segments.map((s, i) => (
                <Polyline
                  key={`${trip.tripId}-${i}`}
                  positions={s.points}
                  pathOptions={{
                    color: colors[s.type],
                    weight: 5,
                  }}
                />
              ))}

              {/* START */}
              <Marker position={[start.latitude, start.longitude]}>
                <Popup>🚀 Trip {tripIndex + 1} Start</Popup>
              </Marker>

              {/* END */}
              <Marker position={[end.latitude, end.longitude]}>
                <Popup>🏁 Trip {tripIndex + 1} End</Popup>
              </Marker>

              {/* STOPPED */}
              {segments
                .filter((s) => s.type === "stopped")
                .map((s, i) => {
                  const [lat, lng] = s.points[0];
                  return (
                    <Marker
                      key={`stopped-${trip.tripId}-${i}`}
                      position={[lat, lng]}
                      icon={icons.stopped}
                    >
                      <Popup>🔵 Stopped</Popup>
                    </Marker>
                  );
                })}

              {/* IDLE */}
              {segments
                .filter((s) => s.type === "idle")
                .map((s, i) => {
                  const [lat, lng] = s.points[0];
                  return (
                    <Marker
                      key={`idle-${trip.tripId}-${i}`}
                      position={[lat, lng]}
                      icon={icons.idle}
                    >
                      <Popup>🟣 Idle</Popup>
                    </Marker>
                  );
                })}

              {/* OVERSPEED */}
              {segments
                .filter((s) => s.type === "overspeed")
                .map((s, i) => {
                  const segmentPoints = trip.points.filter((p) =>
                    s.points.some(
                      ([lat, lng]) =>
                        p.latitude === lat && p.longitude === lng
                    )
                  );

                  if (!segmentPoints.length) return null;

                  const maxSpeedPoint = segmentPoints.reduce((max, p) =>
                    p.speed > max.speed ? p : max
                  );

                  return (
                    <Marker
                      key={`overspeed-${trip.tripId}-${i}`}
                      position={[
                        maxSpeedPoint.latitude,
                        maxSpeedPoint.longitude,
                      ]}
                      icon={icons.overspeed}
                    >
                      <Popup>
                        🚨 Overspeed <br />
                        Speed: {maxSpeedPoint.speed.toFixed(1)} km/h
                      </Popup>
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
