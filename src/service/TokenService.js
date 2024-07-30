import jwt from 'jsonwebtoken';
import TokenModel from './../models/Token.js';

class TokenService {
  async findToken(refreshToken) {
    return await TokenModel.findOne({ refreshToken });
  }

  async findAccessToken(accessToken) {
    return await TokenModel.findOne({ accessToken });
  }

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
      expiresIn: '30d',
    });

    return { accessToken, refreshToken };
  }

  async removeToken(refreshToken) {
    return await TokenModel.deleteOne({ refreshToken });
  }

  async saveToken(userId, refreshToken, accessToken) {
    const tokenData = await TokenModel.findOne({ _id: new Object(userId) });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      tokenData.accessToken = accessToken;

      return tokenData.save();
    }

    return await TokenModel.create({
      refreshToken,
      accessToken,
      _id: userId,
    });
  }

  validateAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN);
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();
