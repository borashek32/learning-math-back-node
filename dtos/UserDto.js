module.exports = class UserDto {
  email
  id
  isVerified
  role
  score

  constructor(model) {
    this.email = model.email
    this.id = model._id
    this.isVerified = model.isVerified
    this.score = model.score
    this.role = model.roles
  }
}
