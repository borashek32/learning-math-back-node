"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var userSchema = new _mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true
  },
  isVerified: {
    "default": false,
    type: Boolean
  },
  password: {
    required: true,
    type: String
  },
  role: {
    "default": 'USER',
    type: String
  },
  verificationLink: {
    type: String
  },
  createNewPasswordLink: {
    type: String
  },
  avatarPath: {
    "default": '',
    type: String
  },
  avatarName: {
    "default": '',
    type: String
  }
});
var User = (0, _mongoose.model)('User', userSchema);
var _default = exports["default"] = User;