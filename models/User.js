const { Schema, model } = require('mongoose')

const User = new Schema({
  email: { required: true, type: String, unique: true },
  isVerified: { default: false, type: Boolean },
  password: { required: true, type: String },
  role: { default: 'USER', type: String },
  score: { default: 0, type: Number },
  verificationLink: { type: String },
})

module.exports = model('User', User)
