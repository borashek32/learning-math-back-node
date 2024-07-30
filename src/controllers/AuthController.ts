import AuthService from "../service/AuthService";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/ApiError";
import { LoginRequestBody, RegisterRequestBody, SaveNewPasswordRequestBody } from "../types/types";
import { Request, Response, NextFunction } from 'express';

class AuthController {
  async login(req: Request<{}, {}, LoginRequestBody>, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const userData = await AuthService.login(email, password);

      const maxAge = 30 * 24 * 60 * 60 * 1000;

      res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
        maxAge,
      });

      res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { accessToken } = req.body;
      await AuthService.logout(accessToken);

      res.clearCookie("refreshToken");

      res.json({ message: "Logout successful" });
    } catch (e) {
      next(e);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cookieHeader = req.headers.cookie;
      const cookies = cookieHeader ? cookieHeader.split(";").map(cookie => cookie.trim()) : [];
      const refreshTokenCookie = cookies.find(cookie => cookie.startsWith("refreshToken="));

      const refreshToken = refreshTokenCookie ? refreshTokenCookie.split("=")[1] : null;

      if (!refreshToken) {
        return next(ApiError.UnauthorizedError());
      }

      const userData = await AuthService.refresh(refreshToken);

      if (!userData) {
        return next(ApiError.UnauthorizedError());
      }

      res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async registration(req: Request<any, any, RegisterRequestBody>, res: Response, next: NextFunction): Promise<void> {
    try {
      const errors = validationResult(req).array();

      if (errors.length > 0) {
        const errorMessages = errors.map(error => error.msg);
        return next(ApiError.BadRequest("Validation error", errorMessages));
      }

      const { email, password } = req.body;
      const userData = await AuthService.registration(email, password);

      res.json(userData);
    } catch (e) {
      console.error("Registration error:", e);
      next(e);
    }
  }

  async verify(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { verificationLink } = req.params;
      await AuthService.verify(verificationLink);

      res.redirect(`${process.env.CLIENT_MOBILE_URL}/--/login`);
    } catch (e) {
      next(e);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      const userEmail = await AuthService.forgotPassword(email);

      res.json(userEmail ? `Check your email ${email}` : "User email is not correct");
    } catch (e) {
      next(e);
    }
  }

  async createNewPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { createNewPasswordLink, email } = req.params;

      res.redirect(`${process.env.CLIENT_MOBILE_URL}/--/create-new-password/${createNewPasswordLink}/${email}`);
    } catch (e) {
      next(e);
    }
  }

  async saveNewPassword(
    req: Request<{}, {}, SaveNewPasswordRequestBody>, 
    res: Response, 
    next: NextFunction
  ): Promise<void> {
    try {
      const { password, email } = req.body;

      // Вызов сервиса для сохранения нового пароля
      const userData: IUserData | null = await AuthService.saveNewPassword(email, password);

      if (!userData) {
        // Если данные пользователя не найдены, вернем ошибку
        return next(ApiError.BadRequest("User not found"));
      }

      res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, password, newPassword } = req.body;
      const user = await AuthService.changePassword(userId, password, newPassword);

      if (user) {
        res.json(user);
      } else {
        throw ApiError.BadRequest("User not found");
      }
    } catch (e) {
      next(e);
    }
  }

  async changeEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, newEmail } = req.body;
      const user = await AuthService.changeEmail(userId, newEmail);

      if (user) {
        res.json(user);
      } else {
        throw ApiError.BadRequest("User not found");
      }
    } catch (e) {
      next(e);
    }
  }

  async me(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.authorization;
      const accessToken = token ? token.split(" ")[1] : null;

      if (!accessToken) {
        throw ApiError.UnauthorizedError();
      }

      const user = await AuthService.me(accessToken);

      if (user) {
        res.json(user);
      } else {
        throw ApiError.BadRequest("User not found");
      }
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
