import express from 'express';
const router = express.Router();

import { login, register, logout, auth } from '../controllers/auth.controller.js'

router.post('/login', login)
router.post('/register', register)
router.post('/logout', logout);
router.get('/', auth);

export default router;