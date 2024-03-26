const Router = require('express').Router
const AuthController = require('../controllers/AuthController')
const UserController = require('../controllers/UserController')
const AuthMiddleware = require('./../middleware/AuthMiddleware')
const { body } = require('express-validator')
const jwt = require('jsonwebtoken')
const ApiError = require('../exceptions/ApiError')
const allowCors = require('../service/allowCors')

const router = new Router()

const handler = (req, res) => {
  const d = new Date()
  res.end(d.toString())
}

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' })

    req.user = user
    next()
  })
}

router.get('/', (req, res) => {
  res.send('Все работает')
})

router.post(
  '/registration',
  [
    body('email')
      .notEmpty()
      .withMessage('Email is required.')
      .isEmail()
      .withMessage('Invalid email format.'),
    body('password')
      .notEmpty()
      .isLength({ min: 4, max: 164 })
      .withMessage('Password must be between 4 and 164 characters.'),
  ],
  allowCors(AuthController.registration)
)

// kinda ready
// auth
router.post('/login', allowCors(AuthController.login)) // add remember me 
router.get('/verify/:verificationLink', allowCors(AuthController.verify))
router.post('/forgot-password', allowCors(AuthController.forgotPassword))
router.get('/create-new-password/:createNewPasswordLink/:email', allowCors(AuthController.createNewPassword))
router.post('/save-new-password', allowCors(AuthController.saveNewPassword))

router.post('/change-password', AuthMiddleware, allowCors(AuthController.changePassword))
router.post('/change-email', AuthMiddleware, allowCors(AuthController.changeEmail))
router.get('/me', AuthMiddleware, allowCors(AuthController.me))
router.post('/logout', AuthMiddleware, allowCors(AuthController.logout))

router.get('/refresh', allowCors(AuthController.refresh))

// users - score
router.get('/get-total-user-score/:userId', AuthMiddleware, allowCors(UserController.getTotalUserScore))
router.post('/update-user-score', AuthMiddleware, allowCors(UserController.updateUserScore))
router.post('/update-user-avatar', AuthMiddleware, allowCors(UserController.updateUserAvatar))
// to do

// to check
router.get('/users', AuthMiddleware, UserController.getUsers)

module.exports = router
