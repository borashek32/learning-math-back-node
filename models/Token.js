const { Schema, model } = require('mongoose')

const Token = new Schema({
  refreshToken: { type: String },
  user: { ref: 'User', type: Schema.Types.ObjectId },
})

module.exports = model('Token', Token)
