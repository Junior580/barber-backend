import AppError from '@shared/errors/AppError'
import { Appointment } from '../infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '../repositories/interfaces/IAppointmentsRepository'

interface IRequest {
  provider_id: string
  day: number
  month: number
  year: number
}

export class ListProviderAppointmentsService {
  constructor(
    private readonly appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const appointments =
      await this.appointmentsRepository.findAllInDayFromProvider({
        provider_id,
        day,
        month,
        year,
      })

    if (!appointments) {
      throw new AppError('Nothing appointment', 401)
    }

    return appointments
  }
}
