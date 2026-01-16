import { ERROR_MESSAGES } from "../../common/errorMessages";
import { BAD_REQUEST_ERROR, CREATION_FAILED_ERROR, NOT_FOUND_ERROR } from "../../common/errors";
import { IUserRegisterDTO } from "../../dtos/userRegisterDto";
import { IUserResponseDTO } from "../../dtos/userResponseDTO";
import { IUserMapper } from "../../mapper/interface/IUserMapper";
import { IUserRepository } from "../../repositories/interface/IUserRepository";
import { HashUtil } from "../../utils/hashUtil";
import { JWTUtil } from "../../utils/jwtUtil";
import { IAuthService } from "../interface/IAuthService";

export class AuthService implements IAuthService {
  constructor(
     private _userRepository : IUserRepository,
     private _userMapper : IUserMapper
  ){}

  async register(dto: IUserRegisterDTO): Promise<void> {
      const user = await this._userRepository.findByEmail(dto.email);
      if(user) throw new BAD_REQUEST_ERROR(ERROR_MESSAGES.USER.ALREADY_EXISTS);
    
     const hashedPassword = await HashUtil.hash(dto.password);
      const userEntity = this._userMapper.toDomain({...dto,password: hashedPassword});

    
     const registeredUser = await this._userRepository.create(userEntity);
    if(!registeredUser)throw new CREATION_FAILED_ERROR(ERROR_MESSAGES.USER.REGISTER_FAILED);
     
  }
  async login(email: string, password: string): Promise<{user:IUserResponseDTO, token : string,refreshToken :string}> {

      const user = await this._userRepository.findByEmail(email);
      if(!user) throw new NOT_FOUND_ERROR(ERROR_MESSAGES.USER.NOT_FOUND);
      
      const match = await HashUtil.compare(password,user.password);
      if(!match) throw new BAD_REQUEST_ERROR(ERROR_MESSAGES.USER.PASSWORD_NOT_MATCH);
      
      
      
      const token = await JWTUtil.createAccessToken({userId: user.id});
      console.log("token is", token)
       const refreshToken = await JWTUtil.createRefreshToken({userId: user.id});
       const userData = this._userMapper.toResponseDTO(user);
   
    return {
       user:userData,
       token,
       refreshToken 
    }
    
  }
}