import express from 'express';
const app = express();

import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import authRoutes from './routes/auth.routes.js'
import transactionRoutes from './routes/transaction.routes.js'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CLIENT_FULL_URL,
    credentials: true,
}));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/transaction", transactionRoutes);

export default app;