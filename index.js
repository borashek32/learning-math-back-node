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
const path = require('path')

const PORT = process.env.PORT || 3000

const app = express()

const corsOptions = {
  origin: "https://learning-math-front-react.vercel.app/",
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  methods: '*',
}

const secretKeyJwt = bcrypt.hash('learning-math.com', 5).toString('hex')
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKeyJwt
};

app.use(cors(corsOptions))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const secretKey = bcrypt.hash('learning-math.com', 5).toString('hex')
app.use(session({
  resave: false,
  secret: secretKey,
  saveUninitialized: false
}))

app.use(express.json())
app.use(cookieParser())

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', router)
app.use(ErrorMiddleware)

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL)
		app.listen(PORT, () => console.log(`server started ${PORT}`))
	} catch(e) {
		console.log('error from the first index.js', e)
	}
}

start()