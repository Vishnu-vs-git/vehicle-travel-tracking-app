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
      
     
      if(!email&&!password)throw new BAD_REQUEST_ERROR(ERROR_MESSAGES.USER.EMAIL_AND_PASSWORD_EMPTY_ERROR)
      if(!email)throw new BAD_REQUEST_ERROR(ERROR_MESSAGES.USER.EMAIL_EMPTY_ERROR);
      if(!password)throw new BAD_REQUEST_ERROR(ERROR_MESSAGES.USER.PASSWORD_EMPTY_ERROR);


      const user = await this._userRepository.findByEmail(email);
      if(!user) throw new NOT_FOUND_ERROR(ERROR_MESSAGES.USER.NOT_FOUND);
      
      const match = await HashUtil.compare(password,user.password);
      if(!match) throw new BAD_REQUEST_ERROR(ERROR_MESSAGES.USER.PASSWORD_NOT_MATCH);
      
      
      
      const token = await JWTUtil.createAccessToken({userId: user.id});
    
       const refreshToken = await JWTUtil.createRefreshToken({userId: user.id});
       const userData = this._userMapper.toResponseDTO(user);
   
    return {
       user:userData,
       token,
       refreshToken 
    }
    
   }
   async getUserById(userId :string): Promise<IUserResponseDTO> {

      const userEntity = await this._userRepository.findById(userId);
      if(!userEntity)throw new NOT_FOUND_ERROR(ERROR_MESSAGES.USER.NOT_FOUND);
   
   return this._userMapper.toResponseDTO(userEntity);

   }
}