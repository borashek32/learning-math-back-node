import AuthService from "../service/AuthService.js";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/ApiError.js";

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await AuthService.login(email, password);

      const maxAge = 30 * 24 * 60 * 60 * 1000;

      res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
        maxAge,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { accessToken } = req.body;
      await AuthService.logout(accessToken);

      res.clearCookie("refreshToken");

      return res.json({ message: "Logout successful" });
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const cookieHeader = req.headers.cookie;
      const cookies = cookieHeader.split(";").map(cookie => cookie.trim());
      const refreshTokenCookie = cookies.find(cookie => cookie.startsWith("refreshToken="));

      const refreshToken = refreshTokenCookie ? refreshTokenCookie.split("=")[1] : null;
      const userData = await AuthService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async registration(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors));
      }

      const { email, password } = req.body;
      const userData = await AuthService.registration(email, password);

      return res.json(userData);
    } catch (e) {
      console.error("Registration error:", e);
      next(e);
    }
  }

  async verify(req, res, next) {
    try {
      const { verificationLink } = req.params;
      await AuthService.verify(verificationLink);

      return res.redirect(`${process.env.CLIENT_MOBILE_URL}/--/login`);
    } catch (e) {
      next(e);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      const userEmail = await AuthService.forgotPassword(email);

      return res.json(userEmail ? `Check your email ${email}` : "User email is not correct");
    } catch (e) {
      next(e);
    }
  }

  async createNewPassword(req, res, next) {
    try {
      const { createNewPasswordLink, email } = req.params;

      return res.redirect(`${process.env.CLIENT_MOBILE_URL}/--/create-new-password/${createNewPasswordLink}/${email}`);
    } catch (e) {
      next(e);
    }
  }

  async saveNewPassword(req, res, next) {
    try {
      const { password, email } = req.body;
      const userData = await AuthService.saveNewPassword(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async changePassword(req, res, next) {
    try {
      const { userId, password, newPassword } = req.body;
      const user = await AuthService.changePassword(userId, password, newPassword);

      if (user) {
        return res.json(user);
      } else {
        throw ApiError.BadRequest("User not found");
      }
    } catch (e) {
      next(e);
    }
  }

  async changeEmail(req, res, next) {
    try {
      const { userId, newEmail } = req.body;
      const user = await AuthService.changeEmail(userId, newEmail);

      if (user) {
        return res.json(user);
      } else {
        throw ApiError.BadRequest("User not found");
      }
    } catch (e) {
      next(e);
    }
  }

  async me(req, res, next) {
    try {
      const token = req.headers.authorization;
      const accessToken = token.split(" ")[1];
      const user = await AuthService.me(accessToken);

      if (user) {
        return res.json(user);
      } else {
        throw ApiError.BadRequest("User not found");
      }
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
