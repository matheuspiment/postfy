import { Router } from 'express'

import authMiddleware from './middlewares/auth'

import UserController from './controllers/UserController'
import AuthController from './controllers/AuthController'

const routes = Router()

// Auth
routes.post('/login', AuthController.login)

// User
routes.post('/register', UserController.register)

// Auth Middleware
routes.use(authMiddleware)

// Post
routes.post('/create/post', (req, res) => {
  return res.json({ post: 'Oi' })
})

export default routes
