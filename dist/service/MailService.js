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
const nodemailer_1 = __importDefault(require("nodemailer"));
class MailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            auth: {
                pass: process.env.SMTP_PASSWORD,
                user: process.env.SMTP_USER,
            },
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT, 10),
            secure: false,
        });
    }
    sendConfirmationLetter(to, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.transporter.sendMail({
                from: process.env.SMTP_USER,
                subject: `Your new account on Learn-math.com`,
                html: `
        <div>
          <p>
            You successfully registered on 
            <a href="#">Learn-math.com</a>
          </p>
          <p>User email: ${user.email}</p>
        </div>
      `,
                text: "",
                to,
            });
        });
    }
    sendPasswordRecoveryLink(to, passwordRecoveryLink) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.transporter.sendMail({
                from: process.env.SMTP_USER,
                subject: `Follow the link to create new password on Learn-math.com`,
                html: `
        <div>
          <h1>To create a new password for your account follow the link</h1>
          <a href="${passwordRecoveryLink}">${passwordRecoveryLink}</a>
        </div>
      `,
                text: "",
                to,
            });
        });
    }
}
exports.default = new MailService();
