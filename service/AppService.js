const UserModel = require('../models/User')

class AppService {
  async getAllUsers() {
    
    return await UserModel.find()
  }

  async updateUserScore(userId, newScore) {
    try {
      const user = await UserModel.findById(userId)
      if (user) {
        user.score = newScore
        await user.save()
        return { success: true, message: 'User score updated successfully' }
      } else {
        return { success: false, message: 'User not found' }
      }
    } catch (error) {
      throw error
    }
  }
}

module.exports = new AppService()