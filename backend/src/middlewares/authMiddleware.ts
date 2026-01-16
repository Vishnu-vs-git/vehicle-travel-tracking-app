import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/auth-request";
import { CustomError } from "../common/customError";
import jwt  from "jsonwebtoken"
import { JwtPayload } from "../types/jwtTypes";

export class AuthMiddleware {
  static authenticate(req: AuthRequest, res :Response, next:NextFunction) {
    try{
     const token = req.cookies?.accessToken;
     if(!token) throw new CustomError("UnAuthorized",401);

     const decoded = jwt.verify(
       token,
       process.env.ACCESS_TOKEN_SECRET as string
     ) as JwtPayload;

    if (!decoded || !decoded.userId) {
        throw new CustomError("Invalid or expired token", 401);
      }
     req.userId = decoded.userId;
     next();
    }catch(err){
       next(err)
    }
  }
}