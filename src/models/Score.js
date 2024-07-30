import { Schema, model } from 'mongoose';

const scoreSchema = new Schema({
  userId: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: String, required: true },
});

export default model('Score', scoreSchema);