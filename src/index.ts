// import 'dotenv/config'; // always change this line for prod
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import router from './router/index';
import ErrorMiddleware from './middleware/ErrorMiddleware';
import bcrypt from 'bcryptjs';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import User from './models/User/User';

import * as dotenv from 'dotenv';
dotenv.config();

const PORT = 7001;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const secretKeyJwt = bcrypt.hashSync('learning-math.com', 5);
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKeyJwt, // Замените на свой секретный ключ для подписи и верификации токенов JWT
};

const app = express();

app.use(cors(corsOptions));
app.use(
  session({
    secret: 'learning-math.com',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', router);
app.use(ErrorMiddleware);

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
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
  })
);

const start = async () => {
  try {
    const dbUrl = process.env.DB_URL;
    if (!dbUrl) {
      throw new Error("DB_URL is not defined in the environment variables.");
    }
    await mongoose.connect(dbUrl);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.error('Error from the first index.js', e);
  }
};

start();
