"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tokenSchema = new mongoose_1.Schema({
    refreshToken: { type: String, required: false },
    accessToken: { type: String, required: false },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
});
const Token = (0, mongoose_1.model)('Token', tokenSchema);
exports.default = Token;
