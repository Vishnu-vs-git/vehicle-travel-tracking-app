// src/utils/buildSegments.ts
import type { GpsPoint } from "../types/gpsTypes";

export type SegmentType = "normal" | "idle" | "stopped" | "overspeed";

interface Segment {
  type: SegmentType;
  points: [number, number][];
}

const OVER_SPEED_LIMIT = 60;
const IDLE_SPEED_LIMIT = 3;

export function buildSegments(points: GpsPoint[]): Segment[] {
  if (points.length < 2) return [];

  const segments: Segment[] = [];
  let currentType = getType(points[0]);
  let currentPoints: [number, number][] = [
    [points[0].latitude, points[0].longitude],
  ];

  for (let i = 1; i < points.length; i++) {
    const type = getType(points[i]);

    if (type === currentType) {
      currentPoints.push([points[i].latitude, points[i].longitude]);
    } else {
      segments.push({ type: currentType, points: currentPoints });
      currentType = type;
      currentPoints = [
        [points[i - 1].latitude, points[i - 1].longitude],
        [points[i].latitude, points[i].longitude],
      ];
    }
  }

  segments.push({ type: currentType, points: currentPoints });
  return segments;
}

function getType(p: GpsPoint): SegmentType {
  if (!p.ignition) return "stopped";
  if (p.speed < IDLE_SPEED_LIMIT) return "idle";
  if (p.speed > OVER_SPEED_LIMIT) return "overspeed";
  return "normal";
}
