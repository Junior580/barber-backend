import { Router } from 'express'

import { CreateUserController } from '../controllers/CreateUserController'
import { DeleteUserController } from '../controllers/DeleteUserController'
import { GetUserController } from '../controllers/GetUserController'
import { UpdateUserController } from '../controllers/UpdateUserController'
import { UpdateUserAvatarController } from '../controllers/UserAvatarController'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

import multer from 'multer'
import uploadConfig from '@config/upload'

const upload = multer(uploadConfig)

export const usersRoutes = Router()

const createUserController = new CreateUserController()
const getUserController = new GetUserController()
const updateUserController = new UpdateUserController()
const deleteUserController = new DeleteUserController()
const userAvatarController = new UpdateUserAvatarController()

usersRoutes.post('/', createUserController.handle)
usersRoutes.get('/', getUserController.handle)
usersRoutes.put('/:id', updateUserController.handle)
usersRoutes.delete('/:id', deleteUserController.handle)
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.handle
)
