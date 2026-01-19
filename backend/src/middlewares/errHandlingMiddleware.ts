import { NextFunction, Request, Response } from "express";
import { CustomError } from "../common/customError";
import { BAD_REQUEST_ERROR, CREATION_FAILED_ERROR, FORBIDDEN_ERROR, NOT_FOUND_ERROR } from "../common/errors";
import { StatusCode } from "../common/statusCode";
import jwt from 'jsonwebtoken';
import { ZodError } from "zod";
export class ErrorHandlingMiddleware {
  static handleError(
    err: Error | CustomError | ZodError,
    req: Request,
    res: Response,
    _next: NextFunction
  ) {
    
    /* ---------------- Domain Errors ---------------- */
    if (err instanceof NOT_FOUND_ERROR) {
      return res.status(StatusCode.NOT_FOUND).json({
        success: false,
        statusCode: StatusCode.NOT_FOUND,
        message: err.message,
        errors: [],
      });
    }

    if (err instanceof BAD_REQUEST_ERROR) {
      return res.status(StatusCode.BAD_REQUEST).json({
        success: false,
        statusCode: StatusCode.BAD_REQUEST,
        message: err.message,
        errors: [],
      });
    }
     if (err instanceof CREATION_FAILED_ERROR) {
       return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
         success: false,
         statusCode: StatusCode.INTERNAL_SERVER_ERROR,
         message: err.message,
         errors: [],
        });
      }
      
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(StatusCode.UNAUTHORIZED).json({
          success: false,
          message: 'Token has expired',
          code: 'TOKEN_EXPIRED',
        });
      }
      if (err instanceof FORBIDDEN_ERROR) {
        return res.status(StatusCode.FORBIDDEN).json({
          success: false,
          message: 'Token has expired',
          code: 'TOKEN_EXPIRED',
        });
      }
      if (err instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCode.UNAUTHORIZED).json({
          success: false,
          statusCode: StatusCode.UNAUTHORIZED,
          message: "Invalid token",
          code: "INVALID_TOKEN",
        });
      }
      
      if (err instanceof ZodError) {
        return res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          statusCode: StatusCode.BAD_REQUEST,
          message: 'Validation Error',
          errors: err.issues.map(e => `${e.path.join('.')} - ${e.message}`),
        });
      }
      if (err instanceof CustomError) {
       
        return res.status(err.statusCode).json({
          success: false,
          statusCode: err.statusCode,
          
          message: err.message,
         
        });
      }
      
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
        message: 'internalServer error',
      errors: [],
    });
  }
}