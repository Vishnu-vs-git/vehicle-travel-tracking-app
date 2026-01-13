import { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodObject } from "zod";

export class InputDataValidator {
  static validate(schema: ZodObject): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      req.body = schema.parse(req.body);
      next();
    };
  }
  // static validateQuery(schema: ZodType): RequestHandler {
  //   return (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
  //     req.validatedQuery = schema.parse(req.query);
  //     next();
  //   };
  // }
}