// require('dotenv').config() // always change this line for prod
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const passport = require('passport')
const router = require('./router/index')
const ErrorMiddleware = require('./middleware/ErrorMiddleware')
const bcrypt = require('bcryptjs')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const User = require('./models/User')

const PORT = 7001

const corsOptions = {
  // origin: 'http://localhost:3000',
  origin: 'https://learning-math-front-react.vercel.app',
  credentials: true,
}

const secretKeyJwt = bcrypt.hash('learning-math.com', 5).toString('hex')
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKeyJwt // Замените на свой секретный ключ для подписи и верификации токенов JWT
};

const app = express()

app.use(cors(corsOptions))
const secretKey = bcrypt.hash('learning-math.com', 5).toString('hex')
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false
}))
app.use(express.json())
app.use(cookieParser())

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', router)
app.use(ErrorMiddleware)

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    // Ищем пользователя по идентификатору, который содержится в payload
    const user = await User.findById(payload.id);
    if (!user) {
      return done(null, false); // Пользователь не найден
    }
    return done(null, user); // Пользователь найден и передается в следующий middleware
  } catch (error) {
    return done(error, false); // Возникла ошибка при поиске пользователя
  }
}));

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL)
		app.listen(PORT, () => console.log(`server started ${PORT}`))
	} catch(e) {
		console.log('error from the first index.js', e)
	}
}

start()
