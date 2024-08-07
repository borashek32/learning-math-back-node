"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
// import 'dotenv/config'; // always change this line for prod
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const index_1 = __importDefault(require("./router/index"));
const ErrorMiddleware_1 = __importDefault(require("./middleware/ErrorMiddleware"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passport_jwt_1 = require("passport-jwt");
const User_1 = __importDefault(require("./models/User/User"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const PORT = 7001;
const corsOptions = {
    origin: "http://localhost:3000" || "https://learning-math-front-react.vercel.app",
    credentials: true,
};
const secretKeyJwt = bcryptjs_1.default.hashSync('learning-math.com', 5);
const jwtOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKeyJwt, // Замените на свой секретный ключ для подписи и верификации токенов JWT
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
app.use((0, express_session_1.default)({
    secret: 'learning-math.com',
    resave: false,
    saveUninitialized: false,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/api', index_1.default);
app.use(ErrorMiddleware_1.default);
passport_1.default.use(new passport_jwt_1.Strategy(jwtOptions, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Ищем пользователя по идентификатору, который содержится в payload
        const user = yield User_1.default.findById(payload.id);
        if (!user) {
            return done(null, false); // Пользователь не найден
        }
        return done(null, user); // Пользователь найден и передается в следующий middleware
    }
    catch (error) {
        return done(error, false); // Возникла ошибка при поиске пользователя
    }
})));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbUrl = process.env.DB_URL;
        if (!dbUrl) {
            throw new Error("DB_URL is not defined in the environment variables.");
        }
        yield mongoose_1.default.connect(dbUrl);
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }
    catch (e) {
        console.error('Error from the first index.js', e);
    }
});
start();
