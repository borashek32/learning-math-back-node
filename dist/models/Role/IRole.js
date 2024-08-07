"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roleSchema = new mongoose_1.Schema({
    value: { default: 'USER', type: String, unique: true },
});
const Role = (0, mongoose_1.model)('Role', roleSchema);
exports.default = Role;
