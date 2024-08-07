"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: { required: true, type: String, unique: true },
    isVerified: { default: false, type: Boolean },
    password: { required: true, type: String },
    role: { default: 'USER', type: String },
    verificationLink: { type: String },
    createNewPasswordLink: { type: String },
    avatarPath: { default: '', type: String },
    avatarName: { default: '', type: String },
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
