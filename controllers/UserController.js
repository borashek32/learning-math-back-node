const UserService = require('../service/UserService')
const ApiError = require('../exceptions/ApiError')

class UserController {
  async getUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers()

      return res.json(users)
    } catch (e) {
      next(e)
    }
  }

  async updateUserScore(req, res, next) {
    try {
      const { userId, score, date } = req.body
      const result = await UserService.updateUserScore(userId, score, date)

      return res.json(result)
    } catch (e) {
      next(e)
    }
  }

  async getTotalUserScore(req, res, next) {
    try {
      const { userId } = req.params
      const score = await UserService.getTotalUserScore(userId)

      if (score) {
        return res.json(score)
      } 
    } catch (e) {
      next(e)
    }
  }

  async updateUserAvatar(req, res, next) {
    try {
      const { userId, avatarName, avatarPath } = req.body
      const user = await UserService.updateUserAvatar(userId, avatarPath, avatarName)

      return res.json(user)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new UserController()
