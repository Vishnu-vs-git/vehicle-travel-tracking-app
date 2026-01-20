import { IGpsFactory } from "../../factories/interface/IGpsFactory";
import { GpsModel } from "../../models/gpsModel";
import { GpsDbModel } from "../../types/dbtypes";
import { Gps } from "../../types/gpsTypes";
import { IGpsRepository } from "../interface/IGpsRepository";

export class GpsRepository implements IGpsRepository {
  constructor(
    private _gpsFactory : IGpsFactory<GpsDbModel,Gps>
  ){}
  async  insertMany(GpsPoint: Gps[]): Promise<void> {
      const docs = await GpsModel.insertMany(GpsPoint);
    
  }
  async findByTripId(tripId: string): Promise<Gps[]> {

      const docs = await GpsModel.find({tripId}) as GpsDbModel[];
      
    return this._gpsFactory.toDomainList(docs);
  }
  async deleteGpsPoints(tripId :string): Promise<void> {
      await GpsModel.deleteMany({tripId});
  }

}