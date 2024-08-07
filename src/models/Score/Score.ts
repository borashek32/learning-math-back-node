import { Schema, model } from "mongoose";
import { IScore } from "./IScore";

const scoreSchema = new Schema<IScore>({
  userId: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: String, required: true },
});

const Score = model<IScore>('Score', scoreSchema);

export default Score;