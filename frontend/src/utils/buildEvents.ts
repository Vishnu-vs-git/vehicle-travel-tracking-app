import type { GpsPoint } from "../types/gpsTypes";

export type EventType = "stopped" | "idle" | "overspeed";

export interface TripEvent {
  type: EventType;
  lat: number;
  lng: number;
  durationSec: number;
}

const OVER_SPEED_LIMIT = 60;
const IDLE_SPEED_LIMIT = 3;

export function buildEvents(points: GpsPoint[]): TripEvent[] {
  if (points.length < 2) return [];

  const events: TripEvent[] = [];

  let startIndex = 0;
  let currentType = getType(points[0]);

  for (let i = 1; i < points.length; i++) {
    const type = getType(points[i]);

    if (type !== currentType) {
      pushEvent(events, points, startIndex, i - 1, currentType);
      startIndex = i;
      currentType = type;
    }
  }

  pushEvent(events, points, startIndex, points.length - 1, currentType);

  return events;
}

function pushEvent(
  events: TripEvent[],
  points: GpsPoint[],
  start: number,
  end: number,
  type: EventType | "normal"
) {
  if (type === "normal") return;

  const startTime = new Date(points[start].timeStamp).getTime();
  const endTime = new Date(points[end].timeStamp).getTime();

  const durationSec = (endTime - startTime) / 1000;
  if (durationSec < 60) return; // ignore very short events

  const mid = Math.floor((start + end) / 2);

  events.push({
    type,
    lat: points[mid].latitude,
    lng: points[mid].longitude,
    durationSec,
  });
}

function getType(p: GpsPoint): EventType | "normal" {
  if (!p.ignition) return "stopped";
  if (p.speed < IDLE_SPEED_LIMIT) return "idle";
  if (p.speed > OVER_SPEED_LIMIT) return "overspeed";
  return "normal";
}
