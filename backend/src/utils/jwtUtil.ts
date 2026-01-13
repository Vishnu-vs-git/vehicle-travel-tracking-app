
import jwt from "jsonwebtoken";
import dotenv from"dotenv";
dotenv.config();
export class JWTUtil {
  static async createAccessToken(payload :object)  {
         const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
         return jwt.sign(payload,accessTokenSecret,{expiresIn: "1d"});
        }
  static async createRefreshToken(payload: object) {
          const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;
      return jwt.sign(payload,refreshTokenSecret,{expiresIn: "7d"});
          
 }
}