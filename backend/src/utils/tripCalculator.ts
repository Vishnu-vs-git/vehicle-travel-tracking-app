import * as geolib from "geolib";
import { CsvGpsRow } from "./csvParser";

export interface CalculatedPoint extends CsvGpsRow {
  speed: number;          
  isIdle: boolean;        
  isStoppage: boolean;    
  isOverSpeed: boolean;   
}


export interface TripCalculationResult {
  totalDistance: number;       
  idleTime: number;            
  stoppageTime: number;        
  tripDuration: number;        
  overSpeedTime: number;       
  overSpeedDistance: number;   
  points: CalculatedPoint[];
}

const IDLE_SPEED_THRESHOLD = 1; 
const OVER_SPEED_LIMIT = 60;    

export class TripCalculator {
  static calculate(rows: CsvGpsRow[]): TripCalculationResult {
    if (rows.length < 2) {
      return {
        totalDistance: 0,
        idleTime: 0,
        stoppageTime: 0,
        tripDuration: 0,
        overSpeedTime: 0,
        overSpeedDistance: 0,
        points: rows.map((r) => ({
          ...r,
          speed: 0,
          isIdle: false,
          isStoppage: !r.ignition,
          isOverSpeed: false,
        })),
      };
    }

    let totalDistance = 0;
    let idleTime = 0;
    let stoppageTime = 0;
    let overSpeedTime = 0;
    let overSpeedDistance = 0;

    const points: CalculatedPoint[] = [];

    for (let i = 1; i < rows.length; i++) {
      const prev = rows[i - 1];
      const curr = rows[i];
      if (!prev || !curr) continue;

      const prevTime = parseTimestamp(prev.timestamp);
      const currTime = parseTimestamp(curr.timestamp);
      if (Number.isNaN(prevTime) || Number.isNaN(currTime)) continue;

      const timeDiffSec = (currTime - prevTime) / 1000;
      if (timeDiffSec <= 0) continue;

      const distance = geolib.getDistance(
        { latitude: prev.latitude, longitude: prev.longitude },
        { latitude: curr.latitude, longitude: curr.longitude }
      );

      let speed = (distance / timeDiffSec) * 3.6;
       if (!curr.ignition) {
  speed = 0;
}

      const isOverSpeed = speed > OVER_SPEED_LIMIT;
      const isIdle =
        prev.ignition &&
        curr.ignition &&
        speed <= IDLE_SPEED_THRESHOLD;

      const isStoppage = !prev.ignition && !curr.ignition;

      totalDistance += distance;

      if (isIdle) {
        idleTime += timeDiffSec;
      }

      if (isStoppage) {
        stoppageTime += timeDiffSec;
      }

      if (isOverSpeed) {
        overSpeedTime += timeDiffSec;
        overSpeedDistance += distance;
      }

      points.push({
        ...curr,
        speed,
        isIdle,
        isStoppage,
        isOverSpeed,
      });
    }

    const startTime = parseTimestamp(rows[0]!.timestamp);
    const endTime = parseTimestamp(rows[rows.length - 1]!.timestamp);

    const tripDuration =
      !Number.isNaN(startTime) && !Number.isNaN(endTime)
        ? (endTime - startTime) / 1000
        : 0;

    return {
      totalDistance,
      idleTime,
      stoppageTime,
      tripDuration,
      overSpeedTime,
      overSpeedDistance,
      points,
    };
  }
}


function parseTimestamp(ts: string): number {
  if (!ts) return NaN;

  const clean = ts
    .replace(/\uFEFF/g, "")
    .replace(/\r?\n/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return new Date(clean.replace(" ", "T")).getTime();
}
