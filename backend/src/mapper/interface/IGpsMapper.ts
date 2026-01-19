import { IGpsResponseDTO } from "../../dtos/gpsResponseDto";
import { Gps } from "../../types/gpsTypes";
import { CalculatedPoint } from "../../utils/tripCalculator";

export interface IGpsMapper {
  toDomain(point: CalculatedPoint): Gps;
  toDomainList(data: CalculatedPoint[]): Gps[];
  toResponseDTO(data: Gps): IGpsResponseDTO;
  toResponseDTOList(data: Gps[]): IGpsResponseDTO[];
}