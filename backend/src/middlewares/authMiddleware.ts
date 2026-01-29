import { NextFunction, Response } from "express";
import jwt, { TokenExpiredError }  from "jsonwebtoken"
import { AuthRequest } from "../types/auth-request";
import { CustomError } from "../common/customError";
import { JwtPayload } from "../types/jwtTypes";
import { ERROR_MESSAGES } from "../common/errorMessages";
import { StatusCode } from "../common/statusCode";
import { JWTUtil } from "../utils/jwtUtil";
import { CookieOptionsUtility } from "../utils/cookieOptionsUtility";
import { COOKIE_NAMES } from "../enums/cookieTypes";

export class AuthMiddleware {
  static authenticate(req: AuthRequest, res :Response, next:NextFunction) {
    try{
     const token = req.cookies?.accessToken;
   if (!token) {
      return AuthMiddleware.refreshAccessToken(req, res, next);
    }
     const decoded = jwt.verify(
       token,
       process.env.ACCESS_TOKEN_SECRET as string
     ) as JwtPayload;

    if (!decoded || !decoded.userId) {
        
        throw new CustomError(ERROR_MESSAGES.TOKEN.INVALID_OR_EXPIRED,StatusCode.UNAUTHORIZED);
      }
     req.userId = decoded.userId;
     next();
    }catch(err){
      if (err instanceof TokenExpiredError) {
        return AuthMiddleware.refreshAccessToken(req, res, next);
      }
       
        throw new CustomError(ERROR_MESSAGES.TOKEN.UNAUTHORIZED,StatusCode.UNAUTHORIZED);
    }
  }
   private  static async refreshAccessToken(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        
        throw new CustomError(ERROR_MESSAGES.TOKEN.REFRESH_TOKEN_MISSING,StatusCode.UNAUTHORIZED);
      }

      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string
      ) as JwtPayload;

      if (!decoded || !decoded.userId) {
       
        throw new CustomError(ERROR_MESSAGES.TOKEN.INVALID_REFRESH_TOKEN,StatusCode.UNAUTHORIZED);
      }
      

      const token = await JWTUtil.createAccessToken({userId: decoded.userId});
      const authCookieOptions = CookieOptionsUtility.create(15 * 60 * 1000);
     
         res.cookie(COOKIE_NAMES.ACCESS_TOKEN, token, authCookieOptions);

      req.userId = decoded.userId;
      next();

    } catch  {
     
      next(new CustomError(ERROR_MESSAGES.TOKEN.SESSION_EXPIRED_ERROR,StatusCode.UNAUTHORIZED));
    }
  }
}