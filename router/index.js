const Router = require('express').Router
const AuthController = require('../controllers/AuthController')
const AppController = require('../controllers/AppController')
const AuthMiddleware = require('./../middleware/AuthMiddleware')
const { body } = require('express-validator')

const router = new Router()

router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 9 }),
  AuthController.registration)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.get('/verify/:verificationLink', AuthController.verify)
router.get('/refresh', AuthController.refresh)

router.get('/users', AuthMiddleware, AppController.getUsers)
router.post('/update-score', AuthMiddleware, AppController.updateUserScore)

module.exports = router