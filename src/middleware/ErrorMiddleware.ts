import ApiError from '../exceptions/ApiError';
import { Request, Response, NextFunction } from 'express';

const ErrorMiddleware = (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  console.error(error.message);

  if (error instanceof ApiError) {
    return res
      .status(error.status)
      .json({ errors: error.errors, message: error.message });
  }

  return res.status(500).json({ message: 'Some error occurred' });
}

export default ErrorMiddleware;