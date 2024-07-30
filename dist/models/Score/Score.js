"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var scoreSchema = new _mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});
var Score = (0, _mongoose.model)('Score', scoreSchema);
var _default = exports["default"] = Score;