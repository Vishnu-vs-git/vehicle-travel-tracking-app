import mongoose from "mongoose";



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

export const GpsModel  = mongoose.model("Gps", GpsSchema);