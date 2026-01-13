import { IUserRegisterDTO } from "../../dtos/userRegisterDto";
import { IUserResponseDTO } from "../../dtos/userResponseDTO";
import { User } from "../../types/userTypes";
import { IUserMapper } from "../interface/IUserMapper";

export class UserMapper implements IUserMapper {
  toDomain(data: IUserRegisterDTO): User {
      return new User({
        name : data.name,
        email: data.email,
        password : data.password
      })
  };
  toResponseDTO(data: User): IUserResponseDTO {
      return {
         id : data.id!,
         name : data.name,
         email : data.email,
         createdAt : data.createdAt!
      }
  }
}