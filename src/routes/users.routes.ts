import { Router } from 'express'

import { CreateUserController } from '../controllers/CreateUserController'
import { GetUserController } from '../controllers/GetUserController'
import AppError from '../errors/AppError'

export const usersRoutes = Router()

const createUserController = new CreateUserController()
const getUserController = new GetUserController()

usersRoutes.post('/', createUserController.handle)
usersRoutes.get('/', getUserController.handle)
