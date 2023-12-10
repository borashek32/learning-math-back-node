const jwt = require('jsonwebtoken')
const TokenModel = require('../models/Token')

class TokenService {
  async findToken(refreshToken) {
    return await TokenModel.findOne({ refreshToken })
  }

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '30m' })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: '30d' })

    return { accessToken, refreshToken }
  }

  async removeToken(refreshToken) {
    return await TokenModel.deleteOne({ refreshToken })
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId })

    if (tokenData) {
      tokenData.refreshToken = refreshToken

      return tokenData.save()
    }

    return await TokenModel.create({ refreshToken, user: userId })
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_TOKEN)
    } catch (e) {
      return null
    }
  }
}

module.exports = new TokenService()
