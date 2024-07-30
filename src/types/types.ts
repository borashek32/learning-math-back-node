import { Request } from 'express';// Импортируйте свой интерфейс IUser
import { IUser } from '../models/User/IUser';

// Расширяем стандартный Request интерфейс
export interface CustomRequest extends Request {
  user?: IUser; // Добавляем свойство user с типом IUser
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface RegisterRequestBody {
  email: string;
  password: string;
}

export interface SaveNewPasswordRequestBody {
  password: string;
  email: string;
}

export interface IUserRefreshTokenData {
  refreshToken: string;
}


