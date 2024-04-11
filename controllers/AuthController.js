const AuthService = require('../service/AuthService')
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/ApiError')
const TokenService = require('../service/TokenService')
const passport = require('passport')


class AuthController {
  async login(req, res, next) {
    try {
      const { email, password, rememberMe } = req.body
      const userData = await AuthService.login(email, password)
      console.log('login');

      // const maxAge = rememberMe ? (30 * 24 * 60 * 60 * 1000) : 0
      const maxAge = (30 * 24 * 60 * 60 * 1000)

      res.cookie('refreshToken', userData.refreshToken, {
        httpOnly: true,
        maxAge: maxAge,
      })

      // to look for refreshToken in cookies
      // const headers = res.getHeaders()
      // const setCookieHeader = headers['set-cookie']
      // const cookies = setCookieHeader.split(';').map(cookie => cookie.trim())
      // const refreshToken = cookies.find(cookie => cookie.startsWith('refreshToken='))

      // console.log('Refresh Token:', refreshToken);
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async logout(req, res, next) {
    try {
      const { accessToken } = req.body
      const message = await AuthService.logout(accessToken)

      res.clearCookie('refreshToken')

      delete req.headers.authorization
      delete req.user

      console.log('logout')
      
      return res.json({ message: 'Logout successfull' })
    } catch (e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {
      // to get refreshToken from cookies
      const cookieHeader = req.headers.cookie
      const cookies = cookieHeader.split(';').map(cookie => cookie.trim())
      const refreshTokenCookie = cookies.find(cookie => cookie.startsWith('refreshToken='))

      let refreshToken
      if (refreshTokenCookie) {
        refreshToken = refreshTokenCookie.split('=')[1]
      }

      const userData = await AuthService.refresh(refreshToken)

      res.cookie('refreshToken', userData.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })

      return res.json(userData)
    } catch (e) { 
      next(e)
    }
  }

  async registration(req, res, next) {
    try {
      const errors = validationResult(req)
  
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()))
      }
  
      const { email, password } = req.body
      const userData = await AuthService.registration(email, password)
  
      // res.cookie('refreshToken', userData.refreshToken, {
      //   httpOnly: true,
      //   maxAge: 30 * 24 * 60 * 60 * 1000,
      // })
  
      return res.json(userData)
    } catch (e) {
      console.error('Registration error:', e)
      next(e)
    }
  }

  async verify(req, res, next) {
    try {
      const verificationLink = req.params.verificationLink
      await AuthService.verify(verificationLink) 

      return res.redirect(`${process.env.CLIENT_MOBILE_URL}/--/login`)
      // return res.redirect(`${process.env.CLIENT_MOBILE_URL}/--/verify/${verificationLink}`)
    } catch (e) {
      return next(e)
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const email = req.body.email
      const userEmail = await AuthService.forgotPassword(email)

      if (userEmail) {
        return res.json(`Check your email ${email}`)
      } else {
        return res.json('User email is not correct')
      }
    } catch (e) {
      return next(e)
    }
  }

  async createNewPassword(req, res, next) {
    try {
      const createNewPasswordLink = req.params.createNewPasswordLink
      const email = req.params.email

      return res.redirect(`${process.env.CLIENT_MOBILE_URL}/--/create-new-password/${createNewPasswordLink}/${email}`)
    } catch(e) {
      next(e)
    }
  }

  async saveNewPassword(req, res, next) {
    try {
      const password = req.body.password
      const email = req.body.email

      const userData = await AuthService.saveNewPassword(email, password)
  
      res.cookie('refreshToken', userData.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
  
      return res.json(userData)
    } catch(e) {
      next(e)
    }
  }

  async changePassword(req, res, next) {
    try {
      const { userId, password, newPassword } = req.body
      const _id = userId
      const user = await AuthService.changePassword(_id, password, newPassword)

      if (user) {
        res.json(user)
      } else {
        throw ApiError.BadRequest('User not found')
      }
    } catch(e) {
      next(e)
    }
  }

  async changeEmail(req, res, next) {
    try {
      const { userId, newEmail } = req.body
      
      const _id = userId
      const user = await AuthService.changeEmail(_id, newEmail)

      if (user) {
        res.json(user)
      } else {
        throw ApiError.BadRequest('User not found')
      }
    } catch(e) {
      next(e)
    }
  }

  async me(req, res, next) {
    try {
      const token = req.headers.authorization
      const accessToken = token.split(' ')[1]
      const user = await AuthService.me(accessToken)

      return res.json(user)
    } catch (e) {
      next(e);
    }
  }
}


module.exports = new AuthController()
