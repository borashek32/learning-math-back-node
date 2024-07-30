import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const tokenSchema = new Schema({
  refreshToken: { type: String },
  accessToken: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default model('Token', tokenSchema);