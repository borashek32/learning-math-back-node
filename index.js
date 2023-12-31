require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const router = require('./router/index')
const ErrorMiddleware = require('./middleware/ErrorMiddleware')

const PORT = process.env.PORT || 5001

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
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