"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
        this.name = 'ApiError';
    }
    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
    static UnauthorizedError() {
        return new ApiError(401, 'User not authorized');
    }
}
exports.default = ApiError;
