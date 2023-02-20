import { Router } from 'express'

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { ProvidersController } from '../controllers/ProvidersController'

export const providersRouter = Router()

const providersController = new ProvidersController()

providersRouter.use(ensureAuthenticated)

providersRouter.get('/', providersController.handle)
