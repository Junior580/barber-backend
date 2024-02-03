import { Request, Response } from 'express'
import { ListProviderMonthAvailabilityService } from '@modules/appointments/services/ListProviderMonthAvailabilityService'
import { AppointmentsRepository } from '../../typeorm/repositories/AppointmentsRepository'

export class ProviderMonthAvailabilityController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params
    const { month, year } = request.query

    const appointmentRepo = new AppointmentsRepository()

    const listMonthProvider = new ListProviderMonthAvailabilityService(
      appointmentRepo
    )

    const providers = await listMonthProvider.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    })

    return response.json(providers)
  }
}
