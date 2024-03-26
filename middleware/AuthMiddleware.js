const TokenService = require('../service/TokenService')
const ApiError = require('../exceptions/ApiError')

module.exports = async function(req, res, next) {
  try {
    const path = req.path.toLowerCase()

    if (path === '/me' && !req.headers.authorization) {
      delete req.user 
      return next()      
    } else {
      
      const authorizationHeader = req.headers.authorization
      if (!authorizationHeader) {
        return next(ApiError.UnauthorizedError())
      }
      const accessToken = authorizationHeader.split(' ')[1]
      if (!accessToken) {
        return next(ApiError.UnauthorizedError())
      }

      const userData = await TokenService.validateAccessToken(accessToken)
      if ((!userData && path === '/me')) {
        delete req.user
      } else {
        req.user = userData
      }
      next()
    }
  } catch (error) {
    return next(ApiError.UnauthorizedError())
  }
}
