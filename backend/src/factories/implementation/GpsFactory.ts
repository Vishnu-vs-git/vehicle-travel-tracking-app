import { GpsDbModel } from "../../types/dbtypes";
import { Gps } from "../../types/gpsTypes";
import { IGpsFactory } from "../interface/IGpsFactory";

export class GpsFactory implements IGpsFactory<GpsDbModel,Gps>{
  toDomain(dbModel: GpsDbModel): Gps {
      return new Gps({
        id: dbModel._id?.toString(),
        tripId : dbModel.tripId.toString(),
        latitude : dbModel.latitude,
        longitude : dbModel.longitude,
        timeStamp : dbModel.timeStamp,
        ignition : dbModel.ignition,
        speed : dbModel.speed,
        isIdle: dbModel.isIdle,
isStoppage: dbModel.isStoppage,
isOverSpeed: dbModel.isOverSpeed
        


      })
  }
  toDomainList(dbModel: GpsDbModel[]): Gps[] {
      return dbModel.map((m) => this.toDomain(m))
  }
}