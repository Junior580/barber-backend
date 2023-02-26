import { Router } from 'express'
import { usersRoutes } from '@modules/users/infra/http/routes/users.routes'
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes'
import { appointmentsRouter } from '@modules/appointments/infra/http/routes/appointments.routes'
import { passwordRouter } from '@modules/users/infra/http/routes/password.routes'
import { profileRouter } from '@modules/users/infra/http/routes/profile.routes'
import { providersRouter } from '@modules/appointments/infra/http/routes/providers.routes'

export const routes = Router()

routes.use('/appointments', appointmentsRouter)
routes.use('/providers', providersRouter)
routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter)

// apagar
import { Request, Response } from 'express'
import { UpdateUserAvatarService } from '@modules/users/services/UpdateUserAvatarService'
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository'
import uploadConfig from '@config/upload'
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import multer from 'multer'
import { uploadImgProviders } from '@shared/container/providers/StorageProvider'

const upload = multer(uploadConfig.multer)

routes.patch(
  '/teste',
  ensureAuthenticated,
  upload.single('avatar'),

  async (req: Request, res: Response) => {
    try {
      const userRepo = new UsersRepository()

      const avatarRepo = uploadImgProviders[uploadConfig.driver]

      const updateUserAvatar = new UpdateUserAvatarService(userRepo, avatarRepo)

      const user = await updateUserAvatar.execute({
        user_id: req.user.id,
        avatarFilename: req.file?.filename,
      })

      return res.status(201).json(user)
    } catch (error) {
      return res.json(error).status(400)
    }
  }
)
