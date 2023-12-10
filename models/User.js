const { Schema, model } = require('mongoose')

const User = new Schema({
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	isVerified: { type: Boolean, default: false },
	verificationLink: { type: String },
	score: { type: Number, default: 0 },
	role: { type: String, default: 'USER' }
})

module.exports = model('User', User)