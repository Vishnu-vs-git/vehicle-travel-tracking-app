import { IUserFactory } from "../../factories/interface/IUserFactory";
import { userModel } from "../../models/userModel";
import { UserDbModel } from "../../types/dbtypes";
import { User } from "../../types/userTypes";
import { IUserRepository } from "../interface/IUserRepository";

export class UserRepository implements IUserRepository {
  constructor(
     private _userFactory : IUserFactory<UserDbModel,User>
  ){}

 async create(user: User): Promise<User> {
     const userDb = await userModel.create(user) as UserDbModel;
  return this._userFactory.toDomain(userDb);
 }
 async findByEmail(email: string): Promise<User | null> {
     const userDb = await userModel.findOne({ email }) as UserDbModel | null;
     if (!userDb) return null;
     return this._userFactory.toDomain(userDb);
 }
}