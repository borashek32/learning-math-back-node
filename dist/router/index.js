"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const AuthMiddleware_1 = __importDefault(require("../middleware/AuthMiddleware"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.status(200).json("Welcome,  your app is working well");
});
router.post("/registration", [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Invalid email format."),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .isLength({ min: 4, max: 164 })
        .withMessage("Password must be between 4 and 164 characters."),
], AuthController_1.default.registration);
router.post("/login", AuthController_1.default.login);
// Uncomment and adjust routes as needed
// router.get('/verify/:verificationLink', AuthController.verify);
// router.post('/forgot-password', AuthController.forgotPassword);
// router.get('/create-new-password/:createNewPasswordLink/:email', AuthController.createNewPassword);
// router.post('/save-new-password', AuthController.saveNewPassword);
// Uncomment and adjust routes as needed
// router.post('/change-password', AuthMiddleware, AuthController.changePassword);
// router.post('/change-email', AuthMiddleware, AuthController.changeEmail);
router.get("/me", AuthMiddleware_1.default, AuthController_1.default.me);
router.post("/logout", AuthMiddleware_1.default, AuthController_1.default.logout);
router.get("/refresh", AuthController_1.default.refresh);
// Profile routes
router.get("/get-total-user-score/:userId", AuthMiddleware_1.default, UserController_1.default.getTotalUserScore);
router.post("/update-user-score", AuthMiddleware_1.default, UserController_1.default.updateUserScore);
router.post("/update-user-avatar", AuthMiddleware_1.default, UserController_1.default.updateUserAvatar);
// Uncomment and adjust routes as needed
// router.get('/users', AuthMiddleware, UserController.getUsers);
exports.default = router;
