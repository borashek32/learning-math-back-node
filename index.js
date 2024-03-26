const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const passport = require('passport')
const router = require('./router/index')
const ErrorMiddleware = require('./middleware/ErrorMiddleware')
const bcrypt = require('bcryptjs')

const PORT = 3000

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

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store')
  next()
})

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL)
		app.listen(PORT, () => console.log(`server started ${PORT}`))
	} catch(e) {
		console.log(e)
	}
}

start()

// require('dotenv').config()
// const express = require('express')
// const cors = require('cors')
// const cookieParser = require('cookie-parser')
// const session = require('express-session')
// const mongoose = require('mongoose')
// const passport = require('passport')
// const router = require('./router/index')
// const ErrorMiddleware = require('./middleware/ErrorMiddleware')
// const bcrypt = require('bcryptjs')

// const PORT = 7001

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,
// }

// const app = express()

// app.use(cors(corsOptions))
// const secretKey = bcrypt.hash('learning-math.com', 5).toString('hex')
// app.use(session({
//   secret: secretKey,
//   resave: false,
//   saveUninitialized: false
// }))
// app.use(express.json())
// app.use(cookieParser())

// app.use(passport.initialize())
// app.use(passport.session())

// app.use('/api', router)
// app.use(ErrorMiddleware)

// // Добавляем middleware для обработки CORS
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Разрешить запросы с этого домена
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Разрешить определенные методы
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Разрешить определенные заголовки

//   // Установить, разрешены ли куки при кросс-доменных запросах
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Если это предварительный запрос (preflight request), просто завершите ответ и вернитесь
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }

//   // Передайте управление следующему middleware
//   next();
// });

// app.use((req, res, next) => {
//   res.setHeader('Cache-Control', 'no-store')
//   next()
// })

// const start = async () => {
// 	try {
// 		await mongoose.connect(process.env.DB_URL)
// 		app.listen(PORT, () => console.log(`server started ${PORT}`))
// 	} catch(e) {
// 		console.log(e)
// 	}
// }

// start()
