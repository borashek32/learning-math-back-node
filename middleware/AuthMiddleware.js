const TokenService = require('../service/TokenService')

module.exports = function(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const accessToken = authorizationHeader.split(' ')[1] 
    if (!accessToken) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const userData = TokenService.validateAccessToken(accessToken)
    if (!userData) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    req.user = userData
    next()

  } catch (error) {
    console.error('Error in Authorization Middleware:', error.message);
    return res.status(401).json({ message: 'Unauthorized' });
  }
}