import { IGpsResponseDTO } from "../../dtos/gpsResponseDto";
import { Gps } from "../../types/gpsTypes";
import { CalculatedPoint } from "../../utils/tripCalculator";
import { IGpsMapper } from "../interface/IGpsMapper";


export class GpsMapper implements IGpsMapper {
toDomain(point: CalculatedPoint): Gps {
    return new Gps({
      tripId: point.tripId!,
      latitude: point.latitude,
      longitude: point.longitude,
      timeStamp: new Date(point.timestamp),
      ignition: point.ignition,
      speed: point.speed,
      isIdle: point.isIdle,
      isStoppage: point.isStoppage,
      isOverSpeed: point.isOverSpeed,
    })
}
toDomainList(data: CalculatedPoint[]): Gps[] {
    return data.map((m) => this.toDomain(m));
}
toResponseDTO(data: Gps): IGpsResponseDTO {
  return {
  id: data.id!,
  tripId: data.tripId,
  latitude: data.latitude,
  longitude: data.longitude,
  timeStamp : data.timeStamp,
  ignition: data.ignition,
  speed : data.speed,
  isIdle: data.isIdle,
isStoppage: data.isStoppage,
isOverSpeed: data.isOverSpeed,
  
  }
}
toResponseDTOList(data: Gps[]): IGpsResponseDTO[]{

  return data.map((m) => this.toResponseDTO(m));

}
}