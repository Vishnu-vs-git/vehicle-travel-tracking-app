import mongoose, { Types } from "mongoose";

export interface ITripDocument {
  userId: Types.ObjectId;
  totalDistance : number;
  idleTime : number;
  stoppageTime : number;
  startTime : Date;
  endTime : Date;
  createdAt?: Date;
  updatedAt?: Date;
  tripDuration : number;
  overSpeedTime: number;
  name: string;
  overSpeedDistance: number;
}
export const TripSchema = new mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId
  },
  totalDistance : {
    type : Number,
    default : 0
  },
  idleTime :{
     type : Number,
     default : 0
  },
  name:{
     type : String
  },
  overSpeedDistance : {
     type : Number,
     default : 0
  },
  tripDuration :{
     type : Number,
     default:0
  },
  overSpeedTime : {
    type : Number,
    default: 0
  },
  stoppageTime : {
     type : Number,
     default : 0
  },
  startTime : {
     type : Date
  },
  endTime : {
     type  :Date
  }
},{timestamps:true})

export const TripModel  = mongoose.model<ITripDocument>("Trip",TripSchema);