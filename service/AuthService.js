const UserModel = require('../models/User')
const RoleModel = require('../models/Role')
const TokenModel = require('../models/Token')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const MailService = require('./MailService')
const TokenService = require('./TokenService')
const UserDto = require('./../dtos/UserDto')
const ApiError = require('../exceptions/ApiError')
const { ObjectId } = require('mongodb')

class AuthService {
  async login(email, password) {
    const user = await UserModel.findOne({ email })

    if (!user) {
      throw ApiError.BadRequest('login User not found')
    }
    const isPassEquals = await bcrypt.compare(password, user.password)

    if (!isPassEquals) {
      throw ApiError.BadRequest('User password not correct')
    }
    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })

    await TokenService.saveToken(userDto._id, tokens.refreshToken, tokens.accessToken)

    return { 
      ...tokens, 
      user: userDto,
    }
  }

  async logout(accessToken) {
    TokenService.removeToken(accessToken)

    return 'Logout successful';
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData = TokenService.validateRefreshToken(refreshToken)
    // const tokenFromDb = await TokenService.findToken(refreshToken)

    if (!userData) {
      throw ApiError.UnauthorizedError()
    }

    const user = await UserModel.findById(userData._id)
    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })

    await TokenService.saveToken(userDto._id, tokens.refreshToken, tokens.accessToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  async registration(email, password) {
    const candidate = await UserModel.findOne({ email })

    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exists`)
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const verificationLink = uuid.v4()
    const user = await UserModel.create({ email, password: hashPassword, verificationLink })

    // vercel doesn't send letters idk why stupid vercel 
    // await MailService.sendVerificationLink(
    //   email,
    //   verificationLink
    //   // `${process.env.API_URL}/api/verify/${verificationLink}`
    //   // `${process.env.CLIENT_WEB_URL}/login`
    // )

    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })

    await TokenService.saveToken(userDto._id, tokens.refreshToken, tokens.accessToken)
    // const userRole = await RoleModel.findOne({ value: 'USER' })

    return {
      ...tokens,
      user: userDto,
    }
  }

  async verify(verificationLink) {
    const user = await UserModel.findOne({ verificationLink })

    if (!user) {
      throw new Error('Link is not correct')
    }
    user.isVerified = true
    await user.save()

    return verificationLink
  }

  async forgotPassword(email) {
    const user = await UserModel.findOne({ email })
    const userEmail = user.email

    if (!user) {
      throw ApiError.BadRequest('User email is not correct')
    } else {
      const createNewPasswordLink = uuid.v4()
      await MailService.sendPasswordRecoveryLink(
        email, 
        `${process.env.API_URL}/api/create-new-password/${createNewPasswordLink}/${email}`
      )
    }

    return user.email
  }

  async saveNewPassword(email, password) {
    const user = await UserModel.findOne({ email })
  
    if (!user) {
      throw ApiError.BadRequest('User not found')
    }
  
    const hashPassword = await bcrypt.hash(password, 5)
    const updatedUser = await UserModel.findOneAndUpdate({ email }, { password: hashPassword }, { new: true })
  
    return updatedUser
  }

  async changePassword(_id, password, newPassword) {
    const user = await UserModel.findOne({ _id })

    if (!user) {
      throw ApiError.BadRequest('User not found')
    }

    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest('User password not correct')
    }

    const hashNewPassword = await bcrypt.hash(newPassword, 5)
    const userDto = await UserModel.updateOne({ _id: user._id }, { password: hashNewPassword })

    return userDto
  }
  
  async changeEmail(_id, newEmail) {
    const user = await UserModel.findOne({ _id })
    if (!user) {
      throw ApiError.BadRequest('User not found')
    }

    const userWithTheSameEmail = await UserModel.findOne({ newEmail })
    if (userWithTheSameEmail) {
      throw ApiError.BadRequest(`User with email ${newEmail} already exists`)
    }

    const verificationLink = uuid.v4()
    const userDto = await UserModel.updateOne({
      email: newEmail,
      verificationLink: verificationLink
    })
    
    await MailService.sendVerificationLink(
      newEmail, 
      `${process.env.API_URL}/api/verify/${verificationLink}`
    )

    return userDto
  }

  async me(accessToken) {
    try {
      // Ожидаем завершения запроса к базе данных
      const userTokenModel = await TokenModel.findOne({ accessToken });
      if (!userTokenModel) {
        throw ApiError.BadRequest('User not found')
      }
  
      const objectId = userTokenModel._id
      const _id = objectId.toString()
  
      // Ищем пользователя по _id
      const user = await UserModel.findOne({ _id })
  
      if (user) {
        return user;
      } else {
        throw ApiError.BadRequest('User not found')
      }
    } catch (error) {
      // throw ApiError.InternalServerError(error.message);
    }
  }
}

module.exports = new AuthService()
