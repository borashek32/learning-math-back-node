"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthService_1 = __importDefault(require("../service/AuthService"));
const express_validator_1 = require("express-validator");
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
class AuthController {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const userData = yield AuthService_1.default.login(email, password);
                const maxAge = 30 * 24 * 60 * 60 * 1000;
                res.cookie("refreshToken", userData.refreshToken, {
                    httpOnly: true,
                    maxAge,
                });
                res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { accessToken } = req.body;
                yield AuthService_1.default.logout(accessToken);
                res.clearCookie("refreshToken");
                res.json({ message: "Logout successful" });
            }
            catch (e) {
                next(e);
            }
        });
    }
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cookieHeader = req.headers.cookie;
                const cookies = cookieHeader ? cookieHeader.split(";").map(cookie => cookie.trim()) : [];
                const refreshTokenCookie = cookies.find(cookie => cookie.startsWith("refreshToken="));
                const refreshToken = refreshTokenCookie ? refreshTokenCookie.split("=")[1] : null;
                if (!refreshToken) {
                    return next(ApiError_1.default.UnauthorizedError());
                }
                const userData = yield AuthService_1.default.refresh(refreshToken);
                if (!userData) {
                    return next(ApiError_1.default.UnauthorizedError());
                }
                res.cookie("refreshToken", userData.refreshToken, {
                    httpOnly: true,
                    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней в милисекундах
                });
                res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req).array();
                if (errors.length > 0) {
                    const errorMessages = errors.map(error => error.msg);
                    return next(ApiError_1.default.BadRequest("Validation error", errorMessages));
                }
                const { email, password } = req.body;
                const userData = yield AuthService_1.default.registration(email, password);
                res.json(userData);
            }
            catch (e) {
                console.error("Registration error:", e);
                next(e);
            }
        });
    }
    verify(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { verificationLink } = req.params;
                yield AuthService_1.default.verify(verificationLink);
                res.redirect(`${process.env.CLIENT_MOBILE_URL}/--/login`);
            }
            catch (e) {
                next(e);
            }
        });
    }
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const userEmail = yield AuthService_1.default.forgotPassword(email);
                res.json(userEmail ? `Check your email ${email}` : "User email is not correct");
            }
            catch (e) {
                next(e);
            }
        });
    }
    createNewPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { createNewPasswordLink, email } = req.params;
                res.redirect(`${process.env.CLIENT_MOBILE_URL}/--/create-new-password/${createNewPasswordLink}/${email}`);
            }
            catch (e) {
                next(e);
            }
        });
    }
    saveNewPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, email } = req.body;
                const userData = yield AuthService_1.default.saveNewPassword(email, password);
                if (!userData) {
                    return next(ApiError_1.default.BadRequest("User not found"));
                }
                res.cookie("refreshToken", userData.refreshToken, {
                    httpOnly: true,
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                });
                res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, password, newPassword } = req.body;
                const user = yield AuthService_1.default.changePassword(userId, password, newPassword);
                if (user) {
                    res.json(user);
                }
                else {
                    throw ApiError_1.default.BadRequest("User not found");
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    changeEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, newEmail } = req.body;
                const user = yield AuthService_1.default.changeEmail(userId, newEmail);
                if (user) {
                    res.json(user);
                }
                else {
                    throw ApiError_1.default.BadRequest("User not found");
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    me(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const accessToken = token ? token.split(" ")[1] : null;
                if (!accessToken) {
                    throw ApiError_1.default.UnauthorizedError();
                }
                const user = yield AuthService_1.default.me(accessToken);
                if (user) {
                    res.json(user);
                }
                else {
                    throw ApiError_1.default.BadRequest("User not found");
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new AuthController();
