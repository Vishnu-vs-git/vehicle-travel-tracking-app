// src/utils/buildSegments.ts
import type { GpsPoint } from "../types/gpsTypes";

export type SegmentType = "normal" | "idle" | "overspeed" | "stopped";

interface Segment {
  type: SegmentType;
  points: [number, number][];
}

export function buildSegments(points: GpsPoint[]): Segment[] {
  if (points.length < 2) return [];

  const segments: Segment[] = [];

  let currentType: SegmentType = getType(points[0]);
  let currentPoints: [number, number][] = [
    [points[0].latitude, points[0].longitude],
  ];

  for (let i = 1; i < points.length; i++) {
    const type = getType(points[i]);

    // 🔴 STOPPED → marker only (no line)
    if (type === "stopped") {
      // push previous moving segment
      if (currentPoints.length > 1) {
        segments.push({
          type: currentType,
          points: currentPoints,
        });
      }

      // push stopped marker as single-point segment
      segments.push({
        type: "stopped",
        points: [[points[i].latitude, points[i].longitude]],
      });

      // reset for next movement
      currentType = "normal";
      currentPoints = [[points[i].latitude, points[i].longitude]];
      continue;
    }

    if (type === currentType) {
      currentPoints.push([points[i].latitude, points[i].longitude]);
    } else {
      segments.push({
        type: currentType,
        points: currentPoints,
      });

      currentType = type;
      currentPoints = [
        [points[i - 1].latitude, points[i - 1].longitude],
        [points[i].latitude, points[i].longitude],
      ];
    }
  }

  if (currentPoints.length > 1) {
    segments.push({
      type: currentType,
      points: currentPoints,
    });
  }

  return segments;
}

function getType(p: GpsPoint): SegmentType {
  if (p.isStoppage) return "stopped";
  if (p.isIdle) return "idle";
  if (p.isOverSpeed) return "overspeed";
  return "normal";
}
