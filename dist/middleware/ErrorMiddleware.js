"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiError = _interopRequireDefault(require("../exceptions/ApiError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ErrorMiddleware = function ErrorMiddleware(error, req, res, next) {
  console.error(error.message);
  if (error instanceof _ApiError["default"]) {
    return res.status(error.status).json({
      errors: error.errors,
      message: error.message
    });
  }
  return res.status(500).json({
    message: 'Some error occurred'
  });
};
var _default = exports["default"] = ErrorMiddleware;