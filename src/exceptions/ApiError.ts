class ApiError extends Error {
  status: number;
  errors: string[];

  constructor(status: number, message: string, errors: string[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;

    this.name = 'ApiError';
  }

  static BadRequest(message: string, errors: string[] = []): ApiError {
    return new ApiError(400, message, errors);
  }

  static UnauthorizedError(): ApiError {
    return new ApiError(401, 'User not authorized');
  }
}

export default ApiError;
