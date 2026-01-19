

import { TripDbModel } from "../../types/dbTypes";
import { Trip } from "../../types/tripTypes";
import { ITripFactory } from "../interface/ITripFactory";

export class TripFactory implements ITripFactory<TripDbModel, Trip> {
  toDomain(dbModel: TripDbModel): Trip {
     return  new Trip({
      id: dbModel._id.toString(),
       totalDistance: dbModel.totalDistance,
       startTime : dbModel.startTime,
       stoppageTime : dbModel.stoppageTime,
       endTime: dbModel.endTime,
       idleTime : dbModel.idleTime,
       userId : dbModel.userId.toString(),
      createdAt : dbModel.createdAt!,
      updatedAt : dbModel.updatedAt!,
      tripDuration : dbModel.tripDuration,
      overSpeedTime : dbModel.overSpeedTime,
      name : dbModel.name,
      overSpeedDistance: dbModel.overSpeedDistance
     })
  }
  toDomainList(dbModel: TripDbModel[]): Trip[] {
      return dbModel.map((m) => this.toDomain(m));
  }
}