"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var tokenSchema = new _mongoose.Schema({
  refreshToken: {
    type: String,
    required: false
  },
  accessToken: {
    type: String,
    required: false
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});
var Token = (0, _mongoose.model)('Token', tokenSchema);
var _default = exports["default"] = Token;