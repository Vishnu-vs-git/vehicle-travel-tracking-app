import { NextFunction, Request, Response } from "express";
import { IAuthService } from "../services/interface/IAuthService";
import { StatusCode } from "../common/statusCode";
import { ApiResponse } from "../common/apiResponse";
import { SUCCESS_MESSAGES } from "../common/successMessages";
import { CookieOptionsUtility } from "../utils/cookieOptionsUtility";
import { COOKIE_NAMES } from "../enums/cookieTypes";


export class AuthController {
   constructor(
      private _authService : IAuthService
   ){}
  async register(req : Request, res : Response, next : NextFunction): Promise<void>{
    try{
        await this._authService.register(req.body);
      res.status(StatusCode.SUCCESS).json(ApiResponse.success(SUCCESS_MESSAGES.USER.REGISTER_SUCCESS));
    }catch(err){
      next(err)
    }
  }
 async login(req :Request, res :Response, next: NextFunction) :Promise<void>{
  try{
      const { user,token,refreshToken } = await this._authService.login(req.body.email,req.body.password);

       const authCookieOptions = CookieOptionsUtility.create(15 * 60 * 1000);
       res.cookie(COOKIE_NAMES.ACCESS_TOKEN, token, authCookieOptions);

       const refreshCookieOption = CookieOptionsUtility.create(
        7 * 24 * 60 * 60 * 1000
      );
      res.cookie(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, refreshCookieOption);
    res.status(StatusCode.SUCCESS).json(ApiResponse.success(SUCCESS_MESSAGES.USER.LOGIN_SUCCESS,user));

  }catch(err){
    next(err)
  }
 }
}