import { Types } from "mongoose";
import { IUserDocument } from "../models/userModel";

export type UserDbModel = IUserDocument & {_id : Types.ObjectId | string}