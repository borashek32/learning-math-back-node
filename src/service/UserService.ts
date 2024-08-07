import UserModel from '../models/User/User';
import ScoreModel from '../models/Score/Score';
import ScoreDto from '../dtos/ScoreDto.js';
import ApiError from '../exceptions/ApiError.js';

class UserService {
  async getAllUsers() {
    return await UserModel.find();
  }

  async updateUserScore(userId: string, score: number, date: string) {
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
        await existedUserScore.save(); // Ensure to wait for the save operation to complete

        return { data: existedUserScore };
      }
    } catch (e) {
      return { message: `User not found, ${e}`, success: false };
    }
  }

  async getTotalUserScore(userId: string) {
    try {
      const totalUserScore = await ScoreModel.findOne({ userId });

      if (totalUserScore) {
        return totalUserScore;
      }
      return { message: 'No score found', success: false };
    } catch (e) {
      return { message: `Error retrieving score, ${e}`, success: false };
    }
  }

  async updateUserAvatar(userId: string, avatarPath: string, avatarName: string) {
    try {
      const user = await UserModel.findOne({ _id: userId });

      if (!user) {
        throw ApiError.BadRequest("User not found");
      }

      user.avatarPath = avatarPath;
      user.avatarName = avatarName;
      await user.save();

      return user;
    } catch (e) {
      throw ApiError.BadRequest(`Error updating avatar, ${e}`);
    }
  }
}

export default new UserService();
