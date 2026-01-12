import mongoose, { Types } from "mongoose";

export interface IGpsDocument {
  tripeId : Types.ObjectId;
  latitude : number;
  longitude : number;
  timeStamp : number;
  ignition : number;
  speed: number;
  updatedAt?: Date;
  createdAt?: Date
}

export const GpsSchema  = new mongoose.Schema({
  tripId : {
     type : mongoose.Schema.Types.ObjectId
  },
  latitude : {
    type : Number
  },
  longitude : {
    type : Number
  },
  timeStamp :  {
    type : Date
  },
  ignition  : {
    type : Boolean
  },
  speed : {
    type : Number
  }
},{timestamps: true})

export const GpsModel  = mongoose.model<IGpsDocument>("Gps", GpsSchema);