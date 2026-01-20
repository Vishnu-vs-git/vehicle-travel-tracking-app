import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/auth-request";
import { ITripService } from "../services/interface/ITripService";
import { ApiResponse } from "../common/apiResponse";
import { StatusCode } from "../common/statusCode";
import { ERROR_MESSAGES } from "../common/errorMessages";
import { SUCCESS_MESSAGES } from "../common/successMessages";
import { CustomError } from "../common/customError";
import "multer";


export class TripController {
  constructor(
     private _tripService : ITripService
  ){}
  async uploadTrip(req: AuthRequest, res: Response,next: NextFunction): Promise<void> {
    try {
      
      if (!req.file || !req.userId) {
        res.status(StatusCode.BAD_REQUEST).json(ApiResponse.error(ERROR_MESSAGES.USER.ID_REQUIRED));
        return
      }
       const file = req.file as Express.Multer.File;

      const trip = await this._tripService.uploadTrip(file.path!, req.userId!);
      res.status(StatusCode.CREATED).json(ApiResponse.success(SUCCESS_MESSAGES.TRIP.UPLOAD_SUCCESS,trip));
    } catch (error) {
     next(error)
    }
  }

  async getTrips(req: AuthRequest, res: Response,next: NextFunction): Promise<void> {
    try {
    
       const userId = req.userId;
       
       if(!userId)throw new CustomError(ERROR_MESSAGES.USER.ID_REQUIRED,StatusCode.BAD_REQUEST);

      const trips = await this._tripService.getTrips(userId);
    res.status(StatusCode.SUCCESS).json(ApiResponse.success(SUCCESS_MESSAGES.TRIP.TRIP_FETCH_SUCCESS,trips));
     
    } catch (error) {
       next(error)
    }
  }

  async getTripGps(req: AuthRequest, res: Response,next: NextFunction): Promise<void> {
    try {
       const { tripId } = req.params;
       if(!tripId)throw new CustomError(ERROR_MESSAGES.TRIP.ID_REQUIRED,StatusCode.BAD_REQUEST);

     
       const gps = await this._tripService.getTripGps(tripId);
      res.status(StatusCode.SUCCESS).json(ApiResponse.success(SUCCESS_MESSAGES.GPS.FETCH_SUCCESS,gps));
    } catch (error) {
      next(error)
    }
  }
  async getTrip(req: AuthRequest, res: Response,next: NextFunction): Promise<void> {
    try {
       const { tripId } = req.params;
       if(!tripId)throw new CustomError(ERROR_MESSAGES.TRIP.ID_REQUIRED,StatusCode.BAD_REQUEST);

     
       const trip = await this._tripService.getTripById(tripId);
      res.status(StatusCode.SUCCESS).json(ApiResponse.success(SUCCESS_MESSAGES.GPS.FETCH_SUCCESS,trip));
    } catch (error) {
      next(error)
    }
  }
  async deleteTrip(req: AuthRequest, res: Response,next: NextFunction): Promise<void> {
    try {
       const { tripId } = req.params;
       if(!tripId)throw new CustomError(ERROR_MESSAGES.TRIP.ID_REQUIRED,StatusCode.BAD_REQUEST);

     
           await this._tripService.deleteTrip(tripId);
      res.status(StatusCode.SUCCESS).json(ApiResponse.success(SUCCESS_MESSAGES.TRIP.TRIP_DELETE_SUCCESS));
    } catch (error) {
      next(error)
    }
  }

}
