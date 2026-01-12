import mongoose from "mongoose";

 export interface IUserDocument {
  name : string;
  email  :string;
  password : string;
  createdAt?: Date;
  updatedAt?: Date;
 }


const userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  password : {
     type : String,
     required : true
  }
},{timestamps :true});

export const userModel  = mongoose.model<IUserDocument>("User", userSchema);