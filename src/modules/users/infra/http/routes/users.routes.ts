import { Router } from 'express'

import { CreateUserController } from '../controllers/CreateUserController'
import { DeleteUserController } from '../controllers/DeleteUserController'
import { GetUserController } from '../controllers/GetUserController'
import { UpdateUserController } from '../controllers/UpdateUserController'

export const usersRoutes = Router()

const createUserController = new CreateUserController()
const getUserController = new GetUserController()
const updateUserController = new UpdateUserController()
const deleteUserController = new DeleteUserController()

usersRoutes.post('/', createUserController.handle)
usersRoutes.get('/', getUserController.handle)
usersRoutes.put('/:id', updateUserController.handle)
usersRoutes.delete('/:id', deleteUserController.handle)
