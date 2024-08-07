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
const User_1 = __importDefault(require("../models/User/User"));
const Token_1 = __importDefault(require("../models/Token/Token"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const MailService_1 = __importDefault(require("./MailService"));
const TokenService_js_1 = __importDefault(require("./TokenService.js"));
const UserDto_js_1 = __importDefault(require("../dtos/user/UserDto.js"));
const ApiError_js_1 = __importDefault(require("../exceptions/ApiError.js"));
class AuthService {
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ email });
            if (!user) {
                throw ApiError_js_1.default.BadRequest('User not found');
            }
            const isPassEquals = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPassEquals) {
                throw ApiError_js_1.default.BadRequest('Incorrect password');
            }
            const userDto = new UserDto_js_1.default(user);
            const tokens = TokenService_js_1.default.generateTokens(Object.assign({}, userDto));
            yield TokenService_js_1.default.saveToken(userDto, tokens.refreshToken, tokens.accessToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    logout(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield TokenService_js_1.default.removeToken(accessToken);
            return 'Logout successful';
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw ApiError_js_1.default.UnauthorizedError();
            }
            const userData = TokenService_js_1.default.validateRefreshToken(refreshToken);
            if (!userData) {
                throw ApiError_js_1.default.UnauthorizedError();
            }
            const user = yield User_1.default.findById(userData._id).exec();
            const userDto = new UserDto_js_1.default(user);
            const tokens = TokenService_js_1.default.generateTokens(Object.assign({}, userDto));
            yield TokenService_js_1.default.saveToken(userDto, tokens.refreshToken, tokens.accessToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    registration(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield User_1.default.findOne({ email });
            if (candidate) {
                throw ApiError_js_1.default.BadRequest(`User with email ${email} already exists`);
            }
            const hashPassword = yield bcryptjs_1.default.hash(password, 5);
            const verificationLink = (0, uuid_1.v4)();
            const user = yield User_1.default.create({
                email,
                password: hashPassword,
                verificationLink,
            });
            // Uncomment this line if you need to send a verification email
            // await MailService.sendVerificationLink(
            //   email,
            //   `${process.env.API_URL}/api/verify/${verificationLink}`
            // );
            const userDto = new UserDto_js_1.default(user);
            const tokens = TokenService_js_1.default.generateTokens(Object.assign({}, userDto));
            yield TokenService_js_1.default.saveToken(userDto, tokens.refreshToken, tokens.accessToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    verify(verificationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ verificationLink });
            if (!user) {
                throw new Error('Link is not correct');
            }
            user.isVerified = true;
            yield user.save();
            return verificationLink;
        });
    }
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ email });
            if (!user) {
                throw ApiError_js_1.default.BadRequest('User email is not correct');
            }
            const createNewPasswordLink = (0, uuid_1.v4)();
            yield MailService_1.default.sendPasswordRecoveryLink(email, `${process.env.API_URL}/api/create-new-password/${createNewPasswordLink}/${email}`);
            return user.email;
        });
    }
    saveNewPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ email });
            if (!user) {
                throw ApiError_js_1.default.BadRequest('User not found');
            }
            const hashPassword = yield bcryptjs_1.default.hash(password, 5);
            const updatedUser = yield User_1.default.findOneAndUpdate({ email }, { password: hashPassword }, { new: true });
            return updatedUser;
        });
    }
    changePassword(_id, password, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ _id });
            if (!user) {
                throw ApiError_js_1.default.BadRequest('User not found');
            }
            const isPassEquals = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPassEquals) {
                throw ApiError_js_1.default.BadRequest('Incorrect password');
            }
            const hashNewPassword = yield bcryptjs_1.default.hash(newPassword, 5);
            const userDto = yield User_1.default.updateOne({ _id: user._id }, { password: hashNewPassword });
            return userDto;
        });
    }
    changeEmail(_id, newEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ _id });
            if (!user) {
                throw ApiError_js_1.default.BadRequest('User not found');
            }
            const userWithTheSameEmail = yield User_1.default.findOne({ email: newEmail });
            if (userWithTheSameEmail) {
                throw ApiError_js_1.default.BadRequest(`User with email ${newEmail} already exists`);
            }
            const verificationLink = (0, uuid_1.v4)();
            const userDto = yield User_1.default.updateOne({ _id: user._id }, { email: newEmail, verificationLink });
            // await MailService.sendVerificationLink(
            //   newEmail,
            //   `${process.env.API_URL}/api/verify/${verificationLink}`
            // );
            return userDto;
        });
    }
    me(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userTokenModel = yield Token_1.default.findOne({ accessToken });
                if (!userTokenModel) {
                    throw ApiError_js_1.default.BadRequest('User not found');
                }
                const objectId = userTokenModel.user;
                const user = yield User_1.default.findById(objectId);
                if (user) {
                    return user;
                }
                else {
                    throw ApiError_js_1.default.BadRequest('User not found');
                }
            }
            catch (error) {
                return ApiError_js_1.default.UnauthorizedError(); // it was throw
            }
        });
    }
}
exports.default = new AuthService();
