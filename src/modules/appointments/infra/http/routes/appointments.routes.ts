import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { AppointmentController } from '../controllers/AppointmentsController'
import { ProviderAppointmentsController } from '../controllers/ProviderAppointmentsController'

export const appointmentsRouter = Router()

const appointmentsController = new AppointmentController()
const providerAppointmentsController = new ProviderAppointmentsController()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),

      date: Joi.date().required(),
    },
  }),
  appointmentsController.handle
)
appointmentsRouter.get('/me', providerAppointmentsController.handle)
