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
const UserService_js_1 = __importDefault(require("../service/UserService.js"));
class UserController {
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserService_js_1.default.getAllUsers();
                return res.json(users);
            }
            catch (e) {
                next(e);
            }
        });
    }
    updateUserScore(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, score, date } = req.body;
                const result = yield UserService_js_1.default.updateUserScore(userId, score, date);
                return res.json(result);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getTotalUserScore(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const score = yield UserService_js_1.default.getTotalUserScore(userId);
                if (score) {
                    return res.json(score);
                }
                return res.status(404).json({ message: 'Score not found' });
            }
            catch (e) {
                next(e);
            }
        });
    }
    updateUserAvatar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, avatarName, avatarPath } = req.body;
                const user = yield UserService_js_1.default.updateUserAvatar(userId, avatarPath, avatarName);
                return res.json(user);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new UserController();
