import { ITripResponseDTO } from "../../dtos/tripeResponseDTO";
import { ITripRegisterDTO } from "../../dtos/tripRegisterDto";
import { Trip } from "../../types/tripTypes";


export interface ITripMapper {
  toDomain(data: ITripRegisterDTO): Trip;
   toResponseDTO(data :Trip): ITripResponseDTO;
   toResponseDTOList(data: Trip[]): ITripResponseDTO[]
  
}