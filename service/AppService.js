const UserModel = require('../models/User')

class AppService {
  async getAllUsers() {
    return await UserModel.find()
  }

  async updateUserScore(userId, newScore) {
    const user = await UserModel.findById(userId)

    if (user) {
      user.score = newScore
      await user.save()

      return { message: 'User score updated successfully', success: true }
    } else {
      return { message: 'User not found', success: false }
    }
  }
}

module.exports = new AppService()
