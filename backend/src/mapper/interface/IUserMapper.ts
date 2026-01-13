import { IUserRegisterDTO } from "../../dtos/userRegisterDto";
import { IUserResponseDTO } from "../../dtos/userResponseDTO";
import { User } from "../../types/userTypes";

export interface IUserMapper {
  toDomain(data: IUserRegisterDTO): User;
  toResponseDTO(data :User): IUserResponseDTO;
  
}