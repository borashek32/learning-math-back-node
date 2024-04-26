const TokenService = require('../service/TokenService')
const ApiError = require('../exceptions/ApiError')

module.exports = async function(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError())
    }
    const accessToken = authorizationHeader.split(' ')[1]

    if (!accessToken) {
      return next(ApiError.UnauthorizedError())
    }
    const accessTokenIsValid = TokenService.validateAccessToken(accessToken)

    if (accessTokenIsValid === null) {
      throw ApiError.UnauthorizedError()
    }

    const userData = await TokenService.validateAccessToken(accessToken)
    next()
  } catch (error) {
    console.log('UnauthorizedError')
    return next(ApiError.UnauthorizedError())
  }
}
