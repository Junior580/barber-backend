import { Request, Response } from 'express'

import { CreateAppointmentService } from '@modules/appointments/services/CreateAppointmentService'
import { AppointmentsRepository } from '../../typeorm/repositories/AppointmentsRepository'
import { parseISO } from 'date-fns'
import { NotificationsRepository } from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository'
import { RedisCacheProvider } from '@shared/container/providers/CacheProvider/implementations/RedisCacheProvider'

export class AppointmentController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const { provider_id, date } = request.body
    //exemplo de formato recebido pelo insomina: "date": "2023-03-21 13:00:00"

    const appointmentRepo = new AppointmentsRepository()

    const mongoRepo = new NotificationsRepository()

    const cacheProvider = new RedisCacheProvider()

    const createAppointment = new CreateAppointmentService(
      appointmentRepo,
      mongoRepo,
      cacheProvider
    )

    const appointment = await createAppointment.execute({
      provider_id,
      user_id,
      date,
    })

    return response.json(appointment)
  }
}
