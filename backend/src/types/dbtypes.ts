import { Types } from "mongoose";
import { IUserDocument } from "../models/userModel";
import { ITripDocument } from "../models/tripModel";
import { IGpsDocument } from "../models/gpsModel";

export type UserDbModel = IUserDocument & {_id : Types.ObjectId | string};
export type TripDbModel  = ITripDocument &{_id: Types.ObjectId};
export type GpsDbModel = IGpsDocument &{_id : Types.ObjectId}