import mongoose, { Types } from "mongoose";

export interface IGpsDocument {
  tripId : Types.ObjectId;
  latitude : number;
  longitude : number;
  timeStamp : Date;
  ignition : boolean;
  speed: number;
  updatedAt?: Date;
  createdAt?: Date;
isIdle: boolean,
isStoppage: boolean,
isOverSpeed: boolean

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
  isIdle :{
    type : Boolean,
    
  },
  isStoppage: {
    type :Boolean
  },
  isOverSpeed : {
     type :Boolean
  },
  ignition  : {
    type : Boolean
  },
  speed : {
    type : Number
  }
},{timestamps: true})

export const GpsModel  = mongoose.model<IGpsDocument>("Gps", GpsSchema);