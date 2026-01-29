import { User } from "../../types/userTypes";

export interface IUserRepository {
  findByEmail(email : string): Promise<User| null>;
  create(user :User) : Promise<User>;
  findById(userId:string): Promise<User>
}