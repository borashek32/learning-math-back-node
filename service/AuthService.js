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
    console.log(userDto, tokens);

    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return { 
      ...tokens, 
      user: {
        _id: userDto._id,
        email: user.email,
        isVerified: user.isVerified,
        verificationLink: user.verificationLink,
        role: user.role,
        createNewPasswordLink: user.createNewPasswordLink,
        avatarPath: user.avatarPath,
        avatarName: user.avatarName
      },
    }
  }

  async logout(refreshToken, accessToken) {
    await Promise.all([
        TokenService.removeToken(refreshToken),
        TokenService.removeToken(accessToken),
    ]);
    return 'Logout successful';
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData = TokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await TokenService.findToken(refreshToken)

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }

    const user = await UserModel.findById(userData._id)
    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })

    await TokenService.saveToken(userDto._id, tokens.refreshToken)

    return {
      ...tokens,
      user: {
        _id: userDto._id,
        email: user.email,
        isVerified: user.isVerified,
        verificationLink: user.verificationLink,
        role: user.role,
        createNewPasswordLink: user.createNewPasswordLink,
        avatarPath: user.avatarPath,
        avatarName: user.avatarName
      },
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

    // vercel doesn't send letters idk why stupid vercel ok
    // await MailService.sendVerificationLink(
    //   email,
    //   `${process.env.API_URL}/api/verify/${verificationLink}`
    //   // `${process.env.CLIENT_WEB_URL}/login`
    // )

    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })

    await TokenService.saveToken(userDto._id, tokens.refreshToken)
    // const userRole = await RoleModel.findOne({ value: 'USER' })

    return {
      ...tokens,
      user: {
        _id: userDto._id,
        email: user.email,
        isVerified: user.isVerified,
        verificationLink: user.verificationLink,
        role: user.role,
        createNewPasswordLink: user.createNewPasswordLink,
        avatarPath: user.avatarPath,
        avatarName: user.avatarName
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

  async me(userId) {
    const user = await UserModel.findOne({ _id: userId })

    if (user) {
      return user
    } else {
      throw ApiError.BadRequest('User not found')
    }
  }
}

module.exports = new AuthService()
