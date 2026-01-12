import mongoose, { Types } from "mongoose";

export interface ITripDocument {
  userId?: Types.ObjectId;
  totalDistance : number;
  idleTime : number;
  stoppageTime : number;
  startTime : number;
  endTime : number;
  createdAt?: Date;
  updatedAt?: Date
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
})

export const TripModel  = mongoose.model<ITripDocument>("Trip",TripSchema);