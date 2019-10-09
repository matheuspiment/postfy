import { Router } from 'express'

import authMiddleware from './middlewares/auth'

import UserController from './controllers/UserController'
import AuthController from './controllers/AuthController'
import PostController from './controllers/PostController'
import CityController from './controllers/CityController'

const routes = Router()

// Auth
routes.post('/login', AuthController.login)

// User
routes.post('/register', UserController.register)

// City
routes.get('/cities', CityController.search)

// Auth Middleware
routes.use(authMiddleware)

// Post
routes.post('/create/post', PostController.create)
routes.get('/posts', PostController.list)
routes.delete('/post/:postId', PostController.delete)

export default routes
