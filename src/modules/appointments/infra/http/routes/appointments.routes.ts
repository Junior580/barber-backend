import { Router } from 'express'

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import AppointmentController from '../controllers/AppointmentsController'

export const appointmentsRouter = Router()

const appointmentsController = new AppointmentController()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.post('/', appointmentsController.handle)
