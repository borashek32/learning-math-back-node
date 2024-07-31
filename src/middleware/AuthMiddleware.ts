import { NextFunction, Request, RequestHandler, Response } from 'express';
import TokenService from '../service/TokenService';
import ApiError from '../exceptions/ApiError';
import { IUser } from '../models/User/IUser';

const AuthMiddleware: RequestHandler = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = TokenService.validateAccessToken(accessToken) as IUser;

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
};

export default AuthMiddleware;
