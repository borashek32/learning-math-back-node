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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Token_1 = __importDefault(require("../models/Token/Token"));
class TokenService {
    findToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Token_1.default.findOne({ refreshToken });
        });
    }
    findAccessToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Token_1.default.findOne({ accessToken });
        });
    }
    generateTokens(payload) {
        const accessTokenSecret = process.env.JWT_ACCESS_TOKEN;
        const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN;
        if (!accessTokenSecret || !refreshTokenSecret) {
            throw new Error('JWT secrets are not defined');
        }
        const accessToken = jsonwebtoken_1.default.sign(payload, accessTokenSecret, { expiresIn: '120m' });
        const refreshToken = jsonwebtoken_1.default.sign(payload, refreshTokenSecret, { expiresIn: '30d' });
        return { accessToken, refreshToken };
    }
    removeToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Token_1.default.deleteOne({ refreshToken });
        });
    }
    saveToken(user, refreshToken, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield Token_1.default.findOne({ user: user._id });
            if (tokenData) {
                tokenData.refreshToken = refreshToken;
                tokenData.accessToken = accessToken;
                return tokenData.save();
            }
            return yield Token_1.default.create({
                refreshToken,
                accessToken,
                user: user._id,
            });
        });
    }
    validateAccessToken(token) {
        try {
            const user = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_TOKEN);
            return user;
        }
        catch (e) {
            return null;
        }
    }
    validateRefreshToken(token) {
        const secret = process.env.JWT_REFRESH_TOKEN;
        if (!secret) {
            throw new Error("JWT refresh token secret is not defined in environment variables");
        }
        try {
            return jsonwebtoken_1.default.verify(token, secret);
        }
        catch (e) {
            return null;
        }
    }
}
exports.default = new TokenService();
