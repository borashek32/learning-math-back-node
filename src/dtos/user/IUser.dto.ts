export interface IUserDto {
  email: string;
  _id: string;
  isVerified: boolean;
  role: string;
  avatarPath?: string;
  avatarName?: string;
}