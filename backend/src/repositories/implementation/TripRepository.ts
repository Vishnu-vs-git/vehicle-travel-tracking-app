

import { ITripFactory } from "../../factories/interface/ITripFactory";
import { TripModel } from "../../models/tripModel";
import { TripDbModel } from "../../types/dbTypes";
import { Trip } from "../../types/tripTypes";
import { ITripRepository } from "../interface/ITripRepository";


export class TripRepository implements ITripRepository {
  constructor(
     private _tripFactory : ITripFactory<TripDbModel,Trip>
  ){}

 async create(trip: Trip): Promise<Trip> {
     const tripDb = await TripModel.create(trip) as TripDbModel;
  return this._tripFactory.toDomain(tripDb);
 }
 async findById(tripId: string): Promise<Trip | null> {
     const tripDb = await TripModel.findById(tripId) as TripDbModel | null;
     if (!tripDb) return null;
     return this._tripFactory.toDomain(tripDb);
 }
 async findByUserId(userId: string): Promise<Trip[]> {
    const trips = await TripModel.find({userId}) as TripDbModel[]
   return this._tripFactory.toDomainList(trips);
 }
 async deleteTrip(tripId : string): Promise<void> {
      await TripModel.findByIdAndDelete( tripId);
 }
}