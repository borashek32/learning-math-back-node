"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDto {
    constructor(model) {
        this.email = model.email;
        this._id = model._id.toString();
        this.isVerified = model.isVerified;
        this.role = model.role;
        this.avatarPath = model.avatarPath;
        this.avatarName = model.avatarName;
    }
}
exports.default = UserDto;
