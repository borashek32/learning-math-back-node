import { Document, Types } from 'mongoose';

export interface IScore extends Document {
  userId: string;
  _id: Types.ObjectId;
  score: number;
  date: string;
}