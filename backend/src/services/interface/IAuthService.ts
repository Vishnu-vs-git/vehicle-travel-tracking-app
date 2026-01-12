import { IUserRegisterDTO } from "../../dtos/userRegisterDto";
import { IUserResponseDTO } from "../../dtos/userResponseDTO";

export interface IAuthService {
  register(dto : IUserRegisterDTO): Promise<void>;
  login(email:string,password:string): Promise<IUserResponseDTO>;
}