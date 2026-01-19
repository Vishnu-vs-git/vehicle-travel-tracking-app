import { Gps } from "../../types/gpsTypes";

export interface IGpsRepository {
  insertMany(GpsPoint: Gps[]): Promise<void>;
  findByTripId(tripId : string): Promise<Gps[]>;
  deleteGpsPoints(tripId :string): Promise<void>; 
}