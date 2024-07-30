const UserModel = require("../models/User");
const ScoreModel = require("../models/Score");
const ScoreDto = require("./../dtos/ScoreDto");
const ApiError = require("../exceptions/ApiError");

class UserService {
  async getAllUsers() {
    return await UserModel.find();
  }

  async updateUserScore(userId, score, date) {
    try {
      const existedUserScore = await ScoreModel.findOne({ userId });

      if (!existedUserScore) {
        const newUserScore = await ScoreModel.create({
          userId,
          score,
          date,
        });
        const scoreDto = new ScoreDto(newUserScore);

        return { data: scoreDto };
      } else {
        existedUserScore.score += score;
        existedUserScore.save();

        return { data: existedUserScore };
      }
    } catch (e) {
      return { message: "User not found", success: false };
    }
  }

  async getTotalUserScore(userId) {
    try {
      const totalUserScore = ScoreModel.findOne({ userId });

      if (totalUserScore) {
        return totalUserScore;
      }
    } catch (e) {
      return { message: `User not found, ${e}`, success: false };
    }
  }

  async updateUserAvatar(userId, avatarPath, avatarName) {
    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      throw ApiError.BadRequest("User not found");
    }
    user.avatarPath = avatarPath;
    user.avatarName = avatarName;
    user.save();

    return user;
  }
}

module.exports = new UserService();
