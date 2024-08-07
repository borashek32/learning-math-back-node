import { IUser } from "../../models/User/IUser";
import { IUserDto } from "./IUser.dto";

export default class UserDto implements IUserDto {
  email: string;
  _id: string;
  isVerified: boolean;
  role: string;
  avatarPath?: string;
  avatarName?: string;

  constructor(model: IUser) {
    this.email = model.email;
    this._id = model._id.toString();
    this.isVerified = model.isVerified;
    this.role = model.role;
    this.avatarPath = model.avatarPath;
    this.avatarName = model.avatarName;
  }
}