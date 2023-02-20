import { Request, Response } from 'express'

import { ListProviderAppointmentsService } from '@modules/appointments/services/ListProviderAppointmentsService'
import { AppointmentsRepository } from '../../typeorm/repositories/AppointmentsRepository'

export class ProviderAppointmentsController {
  public async handle(request: Request, response: Response): Promise<Response> {
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
  }
}
