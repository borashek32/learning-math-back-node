"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
const ErrorMiddleware = (error, req, res, next) => {
    console.error(error.message);
    if (error instanceof ApiError_1.default) {
        return res
            .status(error.status)
            .json({ errors: error.errors, message: error.message });
    }
    return res.status(500).json({ message: 'Some error occurred' });
};
exports.default = ErrorMiddleware;
