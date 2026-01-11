import mongoose from "mongoose";


export  class Database {
  static async connect(): Promise<void> {
     try{
        await mongoose.connect( "mongodb://localhost:27017/machineTask");
        console.log("mongodb connected successfully")
     }catch(err){
       console.log("MongoDB connection  failed", err)
     }
  }
}