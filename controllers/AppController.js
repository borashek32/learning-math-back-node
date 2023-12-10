const AppService = require('../service/AppService')
const ApiError = require('../exceptions/ApiError')

class AppController {
  async getUsers(req, res, next) {
    try {
      const users = await AppService.getAllUsers()

      return res.json(users)
    } catch (e) {
      next(e)
    }
  }

  async updateUserScore(req, res, next) {
    try {
      const { newScore, userId } = req.body
      const result = await AppService.updateUserScore(userId, newScore)

      if (result.success) {
        return res.json({ message: result.message })
      } else {
        return res.status(404).json({ message: result.message })
      }
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new AppController()
