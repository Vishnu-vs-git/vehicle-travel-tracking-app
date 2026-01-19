



import { ERROR_MESSAGES } from "../../common/errorMessages";
import {  NOT_FOUND_ERROR } from "../../common/errors";
import { Trip } from "../../types/tripTypes";
import { CsvGpsRow, ParseCsv } from "../../utils/csvParser";
import { TripCalculator } from "../../utils/tripCalculator";
import { ITripService } from "../interface/ITripService";
import { ITripRepository } from "../../repositories/interface/ITripRepository";
import { ITripMapper } from "../../mapper/interface/ITripMapper";
import { ITripResponseDTO } from "../../dtos/tripeResponseDTO";
import { IGpsMapper } from "../../mapper/interface/IGpsMapper";
import { IGpsRepository } from "../../repositories/interface/IGpsRepository";
import { IGpsResponseDTO } from "../../dtos/gpsResponseDto";
import { IGeoLocationService } from "../interface/IGeolocationService";

export class TripService implements ITripService {

   constructor(
     private _tripRepository : ITripRepository,
     private _tripMapper : ITripMapper,
     private _gpsMapper : IGpsMapper,
     private _gpsRepository : IGpsRepository,
     private _geoLocationService : IGeoLocationService
   ){}
  async uploadTrip(
    filePath: string,
    userId: string
  ): Promise<Trip> {


   
    const csvRows: CsvGpsRow[] = await ParseCsv.parse(filePath);
   
    
   
     
    const result = TripCalculator.calculate(csvRows);
      
     const startPoint = csvRows[0];
     const endPoint = csvRows[csvRows.length - 1];

     const startPlace = await this._geoLocationService.reverseGeocode(
     startPoint!.latitude,
     startPoint!.longitude
     );

   const endPlace = await this._geoLocationService.reverseGeocode(
    endPoint!.latitude,
    endPoint!.longitude
   );

    const tripName = `${startPlace} - ${endPlace}`;

    
    const tripEntity = this._tripMapper.toDomain({
      userId,
      startTime: new Date(csvRows[0]!.timestamp),
      endTime: new Date(csvRows[csvRows.length - 1]!.timestamp),
      totalDistance: result.totalDistance,
      idleTime: result.idleTime,
      tripDuration: result.tripDuration,
      overSpeedTime: result.overSpeedTime,
      overSpeedDistance: result.overSpeedDistance,
      stoppageTime: result.stoppageTime,
      name : tripName

    });
     const trip = await this._tripRepository.create(tripEntity);

     if(!trip|| trip.userId !== userId)throw new NOT_FOUND_ERROR(ERROR_MESSAGES.TRIP.NOT_FOUND);

   const points = result.points.map((point) => {
      return this._gpsMapper.toDomain({...point,tripId: trip.id!})
   })
      
       await this._gpsRepository.insertMany(points);

   return this._tripMapper.toResponseDTO(trip);
  }
  async getTrips(userId : string): Promise<ITripResponseDTO[]> {

      const trips = await this._tripRepository.findByUserId(userId);
       if(!trips)throw new NOT_FOUND_ERROR(ERROR_MESSAGES.TRIP.NOT_FOUND);

  return this._tripMapper.toResponseDTOList(trips);
  }

  async getTripById(tripId: string): Promise<ITripResponseDTO | null> {

    const trip = await this._tripRepository.findById(tripId);
  return trip? this._tripMapper.toResponseDTO(trip):null
  }
  async getTripGps(tripId: string): Promise<IGpsResponseDTO[]> {

    const gps = await this._gpsRepository.findByTripId(tripId);
  return this._gpsMapper.toResponseDTOList(gps);
  }
  async deleteTrip(tripId : string) : Promise<void> {
      await this._tripRepository.deleteTrip(tripId);
      await this._gpsRepository.deleteGpsPoints(tripId);
  }
}
