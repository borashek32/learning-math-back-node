import { IUser } from '../models/User/IUser';

export interface IAuth {
  email: string;
  password: string;
}
export interface IUserRefreshTokenData {
  refreshToken: string;
}
export interface IUserData {
  user: IUser;
  refreshToken: string;
  accessToken: string;
}
export interface IUsedDataFromTokenService {
  _id: string;
  email: string;
  isVerified: boolean;
  password: string;
  role: string;
  verificationLink?: string;
  createNewPasswordLink?: string;
  avatarPath?: string;
  avatarName?: string;
  iat: number;
  exp: number;
}
