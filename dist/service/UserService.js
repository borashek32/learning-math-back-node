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
const Score_1 = __importDefault(require("../models/Score/Score"));
const ScoreDto_js_1 = __importDefault(require("../dtos/ScoreDto.js"));
const ApiError_js_1 = __importDefault(require("../exceptions/ApiError.js"));
class UserService {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.find();
        });
    }
    updateUserScore(userId, score, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existedUserScore = yield Score_1.default.findOne({ userId });
                if (!existedUserScore) {
                    const newUserScore = yield Score_1.default.create({
                        userId,
                        score,
                        date,
                    });
                    const scoreDto = new ScoreDto_js_1.default(newUserScore);
                    return { data: scoreDto };
                }
                else {
                    existedUserScore.score += score;
                    yield existedUserScore.save(); // Ensure to wait for the save operation to complete
                    return { data: existedUserScore };
                }
            }
            catch (e) {
                return { message: `User not found, ${e}`, success: false };
            }
        });
    }
    getTotalUserScore(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalUserScore = yield Score_1.default.findOne({ userId });
                if (totalUserScore) {
                    return totalUserScore;
                }
                return { message: 'No score found', success: false };
            }
            catch (e) {
                return { message: `Error retrieving score, ${e}`, success: false };
            }
        });
    }
    updateUserAvatar(userId, avatarPath, avatarName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findOne({ _id: userId });
                if (!user) {
                    throw ApiError_js_1.default.BadRequest("User not found");
                }
                user.avatarPath = avatarPath;
                user.avatarName = avatarName;
                yield user.save();
                return user;
            }
            catch (e) {
                throw ApiError_js_1.default.BadRequest(`Error updating avatar, ${e}`);
            }
        });
    }
}
exports.default = new UserService();
