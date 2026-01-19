import { ITripResponseDTO } from "../../dtos/tripeResponseDTO"
import { ITripRegisterDTO } from "../../dtos/tripRegisterDto"
import { Trip } from "../../types/tripTypes"
import { ITripMapper } from "../interface/ITripMapper"


export class TripMapper implements ITripMapper {
  toDomain(data: ITripRegisterDTO): Trip {
      return new Trip({
         userId: data.userId,
         totalDistance : data.totalDistance,
         idleTime : data.idleTime,
         stoppageTime : data.stoppageTime,
         endTime : data.endTime,
         startTime : data.startTime,
         tripDuration : data.tripDuration,
         overSpeedTime: data.overSpeedTime,
         name : data.name,
         overSpeedDistance: data.overSpeedDistance
      })
  };
   toResponseDTO(data: Trip): ITripResponseDTO {
       return {
          id : data.id!,
          userId: data.userId,
          totalDistance: data.totalDistance,
          idleTime: data.idleTime,
          stoppageTime: data.stoppageTime,
          startTime : data.startTime,
          endTime :data.endTime,
          tripDuration : data.tripDuration,
          createdAt : data.createdAt!,
          overSpeedTime: data.overSpeedTime,
          name: data.name,
          overSpeedDistance:data.overSpeedDistance
       }
   }
   toResponseDTOList(data: Trip[]): ITripResponseDTO[]{
    return data.map((m) => this.toResponseDTO(m));
   }
}