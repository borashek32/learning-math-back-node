const Router = require("express").Router;
const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");
const AuthMiddleware = require("./../middleware/AuthMiddleware");
const { body } = require("express-validator");
// const jwt = require("jsonwebtoken");

const router = new Router();

// const authenticateToken = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   jwt.verify(token, secretKey, (err, user) => {
//     if (err) return res.status(403).json({ message: "Forbidden" });

//     req.user = user;
//     next();
//   });
// };

router.get("/", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});

router.post(
  "/registration",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Invalid email format."),
    body("password")
      .notEmpty()
      .isLength({ min: 4, max: 164 })
      .withMessage("Password must be between 4 and 164 characters."),
  ],
  AuthController.registration
);

// auth
router.post("/login", AuthController.login); // add remember me
// router.get('/verify/:verificationLink', AuthController.verify)
// router.post('/forgot-password', AuthController.forgotPassword)
// router.get('/create-new-password/:createNewPasswordLink/:email', AuthController.createNewPassword)
// router.post('/save-new-password', AuthController.saveNewPassword)

// router.post('/change-password', AuthMiddleware, AuthController.changePassword)
// router.post('/change-email', AuthMiddleware, AuthController.changeEmail)
router.get("/me", AuthMiddleware, AuthController.me);
router.post("/logout", AuthMiddleware, AuthController.logout);

router.get("/refresh", AuthController.refresh);

// profile
router.get(
  "/get-total-user-score/:userId",
  AuthMiddleware,
  UserController.getTotalUserScore
);
router.post(
  "/update-user-score",
  AuthMiddleware,
  UserController.updateUserScore
);
router.post(
  "/update-user-avatar",
  AuthMiddleware,
  UserController.updateUserAvatar
);

// to check
// router.get('/users', AuthMiddleware, UserController.getUsers)

module.exports = router;
