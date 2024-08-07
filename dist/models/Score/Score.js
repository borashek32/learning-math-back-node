"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const scoreSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    score: { type: Number, required: true },
    date: { type: String, required: true },
});
const Score = (0, mongoose_1.model)('Score', scoreSchema);
exports.default = Score;
