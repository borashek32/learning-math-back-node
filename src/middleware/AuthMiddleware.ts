import { RequestHandler } from 'express';
import TokenService from '../service/TokenService';
import ApiError from '../exceptions/ApiError';
import { CustomRequest } from '../types/types';

const AuthMiddleware: RequestHandler = async (req: CustomRequest, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = TokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (error) {
    console.log('UnauthorizedError', error);
    return next(ApiError.UnauthorizedError());
  }
};

export default AuthMiddleware;
