module.exports = class UserDto {
  email
  _id
  isVerified
  role
  avatarPath
  avatarName

  constructor(model) {
    this.email = model.email
    this._id = model._id
    this.isVerified = model.isVerified
    this.role = model.roles
    this.avatarPath = model.avatarPath
    this.avatarName = model.avatar
  }
}
