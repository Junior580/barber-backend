import { Request, Response } from 'express'

import { CreateAppointmentService } from '@modules/appointments/services/CreateAppointmentService'
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository'

export default class AppointmentController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const { provider_id, date } = request.body

    const appointmentRepo = new AppointmentsRepository()

    const createAppointment = new CreateAppointmentService(appointmentRepo)

    const appointment = await createAppointment.execute({
      provider_id,
      user_id,
      date,
    })

    return response.json(appointment)
  }
}
