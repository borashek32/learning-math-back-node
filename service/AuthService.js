const UserModel = require('../models/User')
const RoleModel = require('../models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const MailService = require('./MailService')
const TokenService = require('./TokenService')
const UserDto = require('./../dtos/UserDto')
const ApiError = require('../exceptions/ApiError')

class AuthService {
  async login(email, password) {
    const user = await UserModel.findOne({ email })

    if (!user) {
      throw ApiError.BadRequest('User not found')
    }
    const isPassEquals = await bcrypt.compare(password, user.password)

    if (!isPassEquals) {
      throw ApiError.BadRequest('User password not correct')
    }
    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })

    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: { email: user.email, id: userDto.id, isVerified: user.isVerified } }
  }

  async logout(refreshToken) {
    return TokenService.removeToken(refreshToken)
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError('User not authorized')
    }
    const userData = TokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await TokenService.findToken(refreshToken)

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError('User not authorized')
    }
    const user = await UserModel.findById(userData.id)
    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })

    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: { email: user.email, id: userDto.id, isVerified: user.isVerified } }
  }

  async registration(email, password) {
    const candidate = await UserModel.findOne({ email })

    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exists`)
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const verificationLink = uuid.v4()
    const user = await UserModel.create({ email, password: hashPassword, verificationLink })
    await MailService.sendVerificationLink(email, `${process.env.API_URL}/api/verify/${verificationLink}`)

    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })

    await TokenService.saveToken(userDto.id, tokens.refreshToken)
    // const userRole = await RoleModel.findOne({ value: 'USER' })

    return {
      ...tokens,
      user: {
        id: userDto.id,
        email: user.email,
        isVerified: user.isVerified,
        verificationLink: user.verificationLink,
        role: user.role,
        score: user.score,
      },
    }
  }

  async verify(verificationLink) {
    const user = await UserModel.findOne({ verificationLink })

    if (!user) {
      throw new Error('Link is not correct')
    }
    user.isVerified = true
    await user.save()
  }
}

module.exports = new AuthService()
