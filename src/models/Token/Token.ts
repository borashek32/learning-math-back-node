import { Schema, model } from "mongoose";
import { IToken } from "./IToken";

const tokenSchema = new Schema<IToken>({
  refreshToken: { type: String, required: false }, 
  accessToken: { type: String, required: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Token = model<IToken>('Token', tokenSchema);

export default Token;