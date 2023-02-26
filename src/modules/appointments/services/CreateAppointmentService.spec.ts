import AppError from '@shared/errors/AppError'
import { InMemoryAppointmentsRepository } from '../repositories/inMemory/inMemoryAppointmentsRepository'
import { CreateAppointmentService } from './CreateAppointmentService'
import { InMemoryNotificationsRepository } from '@modules/notifications/repositories/inMemory/InMemoryNotificationsRepository'

let createAppointment: CreateAppointmentService
let inMemoryAppointmentRepository: InMemoryAppointmentsRepository
let notificationsRepository: InMemoryNotificationsRepository

describe('CreateAppointment', () => {
  beforeEach(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentsRepository()
    notificationsRepository = new InMemoryNotificationsRepository()
    createAppointment = new CreateAppointmentService(
      inMemoryAppointmentRepository,
      notificationsRepository
    )
  })

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2023, 4, 10, 12).getTime()
    })
    const appointment = await createAppointment.execute({
      date: new Date(2023, 4, 10, 13),
      user_id: 'user1',
      provider_id: 'user2',
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('user2')
  })

  it('should be not able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2023, 8, 10, 11) // ano, mes(setembro), dia, hora

    await createAppointment.execute({
      // Cria um novo agendamento com uma data setada acima
      date: appointmentDate,
      user_id: 'user1',
      provider_id: 'user2',
    })

    await expect(
      createAppointment.execute({
        date: appointmentDate, // Cria um segundo agendamento na mesma data
        user_id: 'user1',
        provider_id: 'user2',
      })
    ).rejects.toBeInstanceOf(AppError) // deve retornar um erro (rejects) do tipo do AppError
  })

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2023, 4, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2023, 4, 10, 11),
        user_id: 'user1',
        provider_id: 'user2',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be not able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2023, 8, 10, 11) // ano, mes(setembro), dia, hora

    await createAppointment.execute({
      // Cria um novo agendamento com uma data setada acima
      date: appointmentDate,
      user_id: 'user1',
      provider_id: 'user2',
    })

    await expect(
      createAppointment.execute({
        date: appointmentDate, // Cria um segundo agendamento na mesma data
        user_id: 'user1',
        provider_id: 'user2',
      })
    ).rejects.toBeInstanceOf(AppError) // deve retornar um erro (rejects) do tipo do AppError
  })

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2023, 4, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2023, 4, 10, 13),
        provider_id: 'user1',
        user_id: 'user1',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      // mocka a data/hora para este periodo abaixo,assim os testes ocorrem apos isso
      return new Date(2023, 4, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2023, 4, 11, 7),
        provider_id: 'user2',
        user_id: 'user1',
      })
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      createAppointment.execute({
        date: new Date(2023, 4, 11, 18),
        provider_id: 'user2',
        user_id: 'user1',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
