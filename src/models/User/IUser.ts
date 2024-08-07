import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  isVerified: boolean;
  password: string;
  role: string;
  verificationLink?: string;
  createNewPasswordLink?: string;
  avatarPath?: string;
  avatarName?: string;
}