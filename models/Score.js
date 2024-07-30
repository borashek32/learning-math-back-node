const { Schema, model } = require("mongoose");

const Score = new Schema({
  userId: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: String, required: true },
});

module.exports = model("Score", Score);
