require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const passport = require('passport')
const router = require('./router/index')
const ErrorMiddleware = require('./middleware/ErrorMiddleware')
const bcrypt = require('bcryptjs')

const PORT = 7001

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
}

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

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL)
		app.listen(PORT, () => console.log(`server started ${PORT}`))
	} catch(e) {
		console.log(e)
	}
}

start()
