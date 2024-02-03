import { Request, Response } from 'express'
import { ListProviderDayAvailabilityService } from '@modules/appointments/services/ListProviderDayAvailabilityService'
import { AppointmentsRepository } from '../../typeorm/repositories/AppointmentsRepository'

export class ProviderDayAvailabilityController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params
    const { month, year, day } = request.query

    const appointmentRepo = new AppointmentsRepository()

    const listDayProvider = new ListProviderDayAvailabilityService(
      appointmentRepo
    )

    const providers = await listDayProvider.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    })

    return response.json(providers)
  }
}
