import jwt from 'jsonwebtoken';
import TokenModel from '../models/Token/Token';
import { IUser } from '../models/User/IUser';
import UserDto from '../dtos/user/UserDto';

interface IPayload {
  _id: string;
  email: string;
}

class TokenService {
  async findToken(refreshToken: string) {
    return await TokenModel.findOne({ refreshToken });
  }

  async findAccessToken(accessToken: string) {
    return await TokenModel.findOne({ accessToken });
  }

  generateTokens(payload: IPayload) {
    const accessTokenSecret = process.env.JWT_ACCESS_TOKEN as string;
    const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN as string;

    if (!accessTokenSecret || !refreshTokenSecret) {
      throw new Error('JWT secrets are not defined');
    }
  
    const accessToken = jwt.sign(payload, accessTokenSecret, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, { expiresIn: '30d' });
  
    return { accessToken, refreshToken };
  }

  async removeToken(refreshToken: string) {
    return await TokenModel.deleteOne({ refreshToken });
  }

  async saveToken(user: UserDto, refreshToken: string, accessToken: string) {
    const tokenData = await TokenModel.findOne({ user: user._id });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      tokenData.accessToken = accessToken;

      return tokenData.save();
    }

    return await TokenModel.create({
      refreshToken,
      accessToken,
      user: user._id,
    });
  }

  validateAccessToken(token: string) {
    try {
      const user = jwt.verify(token, process.env.JWT_ACCESS_TOKEN!) as IUser;
      
      return user;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string): any | null {
    const secret = process.env.JWT_REFRESH_TOKEN;
    
    if (!secret) {
      throw new Error("JWT refresh token secret is not defined in environment variables");
    }

    try {
      return jwt.verify(token, secret);
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();
