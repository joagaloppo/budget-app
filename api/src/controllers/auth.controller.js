import { User } from '../models/User.js';

import LocalStrategy from 'passport-local'
import passport from 'passport';
import bcrypt from 'bcrypt';

passport.use(new LocalStrategy((email, password, done) => {
    User.findOne({ where: { email } })
    .then(user => {
        if (!user) return done(null, false, { message: `Email doesn't exist` })
        bcrypt.compare(password, user.password, (err, res) => {
            if (res) return done(null, user);
            return done(null, false, { message: 'Password is incorrect' });
        });
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findByPk(id).then(user => done(null, user))
});

export const login = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err)
        if (!user) return res.status(401).json(info)
        req.logIn(user, (err) => {
            if (err) return next(err)
            return res.send(user)
        });
    })(req, res, next)
}

export const register = async (req, res, next) => {
    User.findOne({ where: { email: req.body.username }})
    .then(user => {
        if (user) return res.status(409).json({ message: 'Email already exists' })
        bcrypt.hash(req.body.password.trim(), 10, (err, hash) => {
            if (err) return next(err)
            User.create({
                email: req.body.username.trim(),
                password: hash
            }).then(user => res.send(user))
        })
    })
    .catch(err => console.log(err))
}

export const logout = async (req, res, next) => {
    req.logout(err => {
        if (err) return next(err)
        res.send({ message: 'Logged out' })
    });
}

export const auth = async (req, res) => {
    res.json(req.user);
}