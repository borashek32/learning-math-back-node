import { Schema, model } from 'mongoose';
import { IUser } from './IUser';

const userSchema = new Schema<IUser>({
  email: { required: true, type: String, unique: true },
  isVerified: { default: false, type: Boolean },
  password: { required: true, type: String },
  role: { default: 'USER', type: String },
  verificationLink: { type: String },
  createNewPasswordLink: { type: String },
  avatarPath: { default: '', type: String },
  avatarName: { default: '', type: String },
});

const User = model<IUser>('User', userSchema);

export default User;
