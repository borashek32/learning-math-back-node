const AuthService = require('../service/AuthService')
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/ApiError')

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const userData = await AuthService.login(email, password)

      res.cookie('refreshToken', userData.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.body
      const token = await AuthService.logout(refreshToken)

      res.clearCookie('refreshToken')

      return res.json({ message: `Logout successful ${token}` })
    } catch (e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies
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

      res.cookie('refreshToken', userData.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async verify(req, res) {
    try {
      /* empty */
    } catch (e) {
      //
    }
  }
}

module.exports = new AuthController()
