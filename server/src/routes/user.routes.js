import express from 'express'
import { getProfile, login, logout, register } from '../controllers/user.controller.js'
import { isLoggedIn } from '../middleware/auth.middleware.js'
const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.get('/logout', logout)
authRouter.get('/me',isLoggedIn, getProfile)

export default authRouter;