"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _expressValidator = require("express-validator");
var _AuthController = _interopRequireDefault(require("../controllers/AuthController"));
var _UserController = _interopRequireDefault(require("../controllers/UserController"));
var _AuthMiddleware = _interopRequireDefault(require("../middleware/AuthMiddleware"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();
router.get("/", function (req, res) {
  res.status(200).json("Welcome, your app is working well");
});
router.post("/registration", [(0, _expressValidator.body)("email").notEmpty().withMessage("Email is required.").isEmail().withMessage("Invalid email format."), (0, _expressValidator.body)("password").notEmpty().isLength({
  min: 4,
  max: 164
}).withMessage("Password must be between 4 and 164 characters.")], _AuthController["default"].registration);
router.post("/login", _AuthController["default"].login);

// Uncomment and adjust routes as needed
// router.get('/verify/:verificationLink', AuthController.verify);
// router.post('/forgot-password', AuthController.forgotPassword);
// router.get('/create-new-password/:createNewPasswordLink/:email', AuthController.createNewPassword);
// router.post('/save-new-password', AuthController.saveNewPassword);

// Uncomment and adjust routes as needed
// router.post('/change-password', AuthMiddleware, AuthController.changePassword);
// router.post('/change-email', AuthMiddleware, AuthController.changeEmail);

router.get("/me", _AuthMiddleware["default"], _AuthController["default"].me);
router.post("/logout", _AuthMiddleware["default"], _AuthController["default"].logout);
router.get("/refresh", _AuthController["default"].refresh);

// Profile routes
router.get("/get-total-user-score/:userId", _AuthMiddleware["default"], _UserController["default"].getTotalUserScore);
router.post("/update-user-score", _AuthMiddleware["default"], _UserController["default"].updateUserScore);
router.post("/update-user-avatar", _AuthMiddleware["default"], _UserController["default"].updateUserAvatar);

// Uncomment and adjust routes as needed
// router.get('/users', AuthMiddleware, UserController.getUsers);
var _default = exports["default"] = router;