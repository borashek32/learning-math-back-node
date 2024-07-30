"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var roleSchema = new _mongoose.Schema({
  value: {
    "default": 'USER',
    type: String,
    unique: true
  }
});
var Role = (0, _mongoose.model)('Role', roleSchema);
var _default = exports["default"] = Role;