import { UserDbModel } from "../../types/dbtypes";
import { User } from "../../types/userTypes";
import { IUserFactory } from "../interface/IUserFactory";

export class UserFactory implements IUserFactory<UserDbModel, User> {
  toDomain(dbModel: UserDbModel): User {
     return  new User({
      id: dbModel._id.toString(),
      name :dbModel.name,
      email : dbModel.email,
      password : dbModel.password,
      createdAt : dbModel.createdAt!,
      updatedAt : dbModel.updatedAt!
     })
  }
  toDomainList(dbModel: UserDbModel[]): User[] {
      return dbModel.map((m) => this.toDomain(m));
  }
}