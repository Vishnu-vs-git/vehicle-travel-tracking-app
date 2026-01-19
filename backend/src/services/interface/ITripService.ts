import { IGpsResponseDTO } from "../../dtos/gpsResponseDto";
import { ITripResponseDTO } from "../../dtos/tripeResponseDTO";
import { Trip } from "../../types/tripTypes";

export interface ITripService {
  uploadTrip(filePath: string, userId: string): Promise<Trip>;
  getTrips(userId : string): Promise<ITripResponseDTO[]>;
  getTripById(tripId: string): Promise<ITripResponseDTO | null>; 
  getTripGps(tripId: string): Promise<IGpsResponseDTO[]>;
  deleteTrip(tripId : string) : Promise<void>; 
}