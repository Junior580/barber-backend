import AppError from '@shared/errors/AppError'
import { Appointment } from '../infra/typeorm/entities/Appointment'
import { IAppointmentsRepository } from '../repositories/interfaces/IAppointmentsRepository'
import { ICacheProvider } from '@shared/container/providers/CacheProvider/models/ICacheProvider'

import { instanceToInstance } from 'class-transformer'

interface IRequest {
  provider_id: string
  day: number
  month: number
  year: number
}

export class ListProviderAppointmentsService {
  constructor(
    private appointmentsRepository: IAppointmentsRepository,
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`

    let appointments = await this.cacheProvider.recover<Appointment[]>(cacheKey)

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider(
        {
          provider_id,
          day,
          month,
          year,
        }
      )
      console.log('banco de dados')
      await this.cacheProvider.save(cacheKey, instanceToInstance(appointments))
    }

    if (!appointments) {
      throw new AppError('Nothing appointment', 401)
    }

    return appointments
  }
}
