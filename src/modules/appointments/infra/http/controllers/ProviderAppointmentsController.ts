import { Request, Response } from 'express'

import { ListProviderAppointmentsService } from '@modules/appointments/services/ListProviderAppointmentsService'
import { AppointmentsRepository } from '../../typeorm/repositories/AppointmentsRepository'
import { RedisCacheProvider } from '@shared/container/providers/CacheProvider/implementations/RedisCacheProvider'
import { instanceToInstance } from 'class-transformer'

export class ProviderAppointmentsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id

    const { day, month, year } = request.query

    const appointmentRepo = new AppointmentsRepository()

    const cacheProvider = new RedisCacheProvider()

    const listAppointmentService = new ListProviderAppointmentsService(
      appointmentRepo,
      cacheProvider
    )

    const appointments = await listAppointmentService.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    })

    return response.json(instanceToInstance(appointments))
  }
}
