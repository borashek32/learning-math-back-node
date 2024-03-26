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

// // const PORT = process.env.PORT || 3001
// const PORT = 3000

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,
// }

// const app = express()

// const secretKey = bcrypt.hash('learning-math.com', 5).toString('hex')
// app.use(session({
//   secret: secretKey,
//   resave: false,
//   saveUninitialized: false
// }))
// app.use(cors(corsOptions))
// app.use(express.json())
// app.use(cookieParser())

// app.use(passport.initialize())
// app.use(passport.session())

// app.use('/api', router)
// app.use(ErrorMiddleware)

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


const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;