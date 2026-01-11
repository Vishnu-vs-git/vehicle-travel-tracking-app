import mongoose from "mongoose";


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

export const TripModel  = mongoose.model("Trip",TripSchema);