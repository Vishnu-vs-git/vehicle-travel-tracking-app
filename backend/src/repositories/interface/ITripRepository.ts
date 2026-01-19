import { Trip } from "../../types/tripTypes";

export interface ITripRepository {
  findById(tripId : string): Promise<Trip| null>;
  create(user : Trip) : Promise<Trip>;
  findByUserId(userId: string): Promise<Trip[]>;
  deleteTrip(tripId : string): Promise<void>
}