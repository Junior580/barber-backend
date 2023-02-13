import { Router } from 'express'

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import AppointmentController from '../controllers/AppointmentsController'

//apagar
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository'
import { ListProviderAppointmentsService } from '@modules/appointments/services/ListProviderAppointmentsService'

export const appointmentsRouter = Router()

const appointmentsController = new AppointmentController()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.post('/', appointmentsController.handle)

appointmentsRouter.get('/me', async (request, response) => {
  const provider_id = request.user.id
  const { day, month, year } = request.query
  const appointmentRepo = new AppointmentsRepository()
  const listAppointmentService = new ListProviderAppointmentsService(
    appointmentRepo
  )

  const appointments = listAppointmentService.execute({
    provider_id,
    day: Number(day),
    month: Number(month),
    year: Number(year),
  })

  return response.json(appointments)
})
