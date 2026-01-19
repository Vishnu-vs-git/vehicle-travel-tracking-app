import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


export  class Database {
  static async connect(): Promise<void> {
     try{
        await mongoose.connect( process.env.MONGO_URI!);
        console.log("mongodb connected successfully")
     }catch(err){
       console.log("MongoDB connection  failed", err)
     }
  }
}