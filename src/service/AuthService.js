import UserModel from '../models/User.js';
import TokenModel from '../models/Token.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import MailService from './MailService.js';
import TokenService from './TokenService.js';
import UserDto from '../dtos/UserDto.js';
import ApiError from '../exceptions/ApiError.js';

class AuthService {
  async login(email, password) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest('User not found');
    }
    
    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest('Incorrect password');
    }
    
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto._id, tokens.refreshToken, tokens.accessToken);

    return { 
      ...tokens, 
      user: userDto,
    };
  }

  async logout(accessToken) {
    await TokenService.removeToken(accessToken);
    return 'Logout successful';
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    
    const userData = TokenService.validateRefreshToken(refreshToken);

    if (!userData) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData._id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto._id, tokens.refreshToken, tokens.accessToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exists`);
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const verificationLink = uuidv4();
    const user = await UserModel.create({
      email,
      password: hashPassword,
      verificationLink,
    });

    // Uncomment this line if you need to send a verification email
    // await MailService.sendVerificationLink(
    //   email,
    //   `${process.env.API_URL}/api/verify/${verificationLink}`
    // );

    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto._id, tokens.refreshToken, tokens.accessToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async verify(verificationLink) {
    const user = await UserModel.findOne({ verificationLink });

    if (!user) {
      throw new Error('Link is not correct');
    }
    
    user.isVerified = true;
    await user.save();

    return verificationLink;
  }

  async forgotPassword(email) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest('User email is not correct');
    } 

    const createNewPasswordLink = uuidv4();
    await MailService.sendPasswordRecoveryLink(
      email,
      `${process.env.API_URL}/api/create-new-password/${createNewPasswordLink}/${email}`
    );

    return user.email;
  }

  async saveNewPassword(email, password) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest('User not found');
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      { password: hashPassword },
      { new: true }
    );

    return updatedUser;
  }

  async changePassword(_id, password, newPassword) {
    const user = await UserModel.findOne({ _id });

    if (!user) {
      throw ApiError.BadRequest('User not found');
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Incorrect password');
    }

    const hashNewPassword = await bcrypt.hash(newPassword, 5);
    const userDto = await UserModel.updateOne(
      { _id: user._id },
      { password: hashNewPassword }
    );

    return userDto;
  }

  async changeEmail(_id, newEmail) {
    const user = await UserModel.findOne({ _id });

    if (!user) {
      throw ApiError.BadRequest('User not found');
    }

    const userWithTheSameEmail = await UserModel.findOne({ email: newEmail });
    if (userWithTheSameEmail) {
      throw ApiError.BadRequest(`User with email ${newEmail} already exists`);
    }

    const verificationLink = uuidv4();
    const userDto = await UserModel.updateOne(
      { _id: user._id },
      { email: newEmail, verificationLink }
    );

    await MailService.sendVerificationLink(
      newEmail,
      `${process.env.API_URL}/api/verify/${verificationLink}`
    );

    return userDto;
  }

  async me(accessToken) {
    try {
      const userTokenModel = await TokenModel.findOne({ accessToken });
      if (!userTokenModel) {
        throw ApiError.BadRequest('User not found');
      }

      const objectId = userTokenModel._id;
      const user = await UserModel.findById(objectId);

      if (user) {
        return user;
      } else {
        throw ApiError.BadRequest('User not found');
      }
    } catch (error) {
      return ApiError.UnauthorizedError('User not authorized'); // it was throw
    }
  }
}

export default new AuthService();
