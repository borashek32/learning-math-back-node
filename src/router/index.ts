import { Router } from 'express';
import { body } from 'express-validator';
import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';
import AuthMiddleware from '../middleware/AuthMiddleware';

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json("Welcome,  your app is working well");
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

router.post("/login", AuthController.login);

// Uncomment and adjust routes as needed
// router.get('/verify/:verificationLink', AuthController.verify);
// router.post('/forgot-password', AuthController.forgotPassword);
// router.get('/create-new-password/:createNewPasswordLink/:email', AuthController.createNewPassword);
// router.post('/save-new-password', AuthController.saveNewPassword);

// Uncomment and adjust routes as needed
// router.post('/change-password', AuthMiddleware, AuthController.changePassword);
// router.post('/change-email', AuthMiddleware, AuthController.changeEmail);

router.get("/me", AuthMiddleware, AuthController.me);
router.post("/logout", AuthMiddleware, AuthController.logout);

router.get("/refresh", AuthController.refresh);

// Profile routes
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

// Uncomment and adjust routes as needed
// router.get('/users', AuthMiddleware, UserController.getUsers);

export default router;
