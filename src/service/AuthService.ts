import UserModel from '../models/User/User';
import TokenModel from '../models/Token/Token';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import MailService from './MailService';
import TokenService from './TokenService.js';
import UserDto from '../dtos/user/UserDto.js';
import ApiError from '../exceptions/ApiError.js';
import { IUser } from '../models/User/IUser';

class AuthService {
  async login(email: string, password: string) {
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

    await TokenService.saveToken(userDto, tokens.refreshToken, tokens.accessToken);

    return { 
      ...tokens, 
      user: userDto,
    };
  }

  async logout(accessToken: string) {
    await TokenService.removeToken(accessToken);
    return 'Logout successful';
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    
    const userData = TokenService.validateRefreshToken(refreshToken);

    if (!userData) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData._id).exec();

    const userDto = new UserDto(user as IUser);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto, tokens.refreshToken, tokens.accessToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async registration(email: string, password: string) {
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

    await TokenService.saveToken(userDto, tokens.refreshToken, tokens.accessToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async verify(verificationLink: string) {
    const user = await UserModel.findOne({ verificationLink });

    if (!user) {
      throw new Error('Link is not correct');
    }
    
    user.isVerified = true;
    await user.save();

    return verificationLink;
  }

  async forgotPassword(email: string) {
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

  async saveNewPassword(email: string, password: string) {
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

  async changePassword(_id: string, password: string, newPassword: string) {
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

  async changeEmail(_id: string, newEmail: string) {
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

    // await MailService.sendVerificationLink(
    //   newEmail,
    //   `${process.env.API_URL}/api/verify/${verificationLink}`
    // );

    return userDto;
  }

  async me(accessToken: string) {
    try {
      const userTokenModel = await TokenModel.findOne({ accessToken });
      if (!userTokenModel) {
        throw ApiError.BadRequest('User not found');
      }

      const objectId = userTokenModel.user;
      const user = await UserModel.findById(objectId);
      
      if (user) {
        return user;
      } else {
        throw ApiError.BadRequest('User not found');
      }
    } catch (error) {
      return ApiError.UnauthorizedError(); // it was throw
    }
  }
}

export default new AuthService();
