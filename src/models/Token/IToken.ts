import { Document } from 'mongoose';
import { Types } from 'mongoose';

export interface IToken extends Document {
  refreshToken?: string;
  accessToken?: string;
  user: Types.ObjectId; 
}