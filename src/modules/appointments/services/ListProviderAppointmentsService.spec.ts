import { InMemoryAppointmentsRepository } from '../repositories/InMemory/inMemoryAppointmentsRepository'
import { ListProviderAppointmentsService } from './ListProviderAppointmentsService'

let inMemoryAppointmentsRepository: InMemoryAppointmentsRepository
let listProviderAppointments: ListProviderAppointmentsService

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    inMemoryAppointmentsRepository = new InMemoryAppointmentsRepository()
    listProviderAppointments = new ListProviderAppointmentsService(
      inMemoryAppointmentsRepository
    )
  })

  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await inMemoryAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 7, 20, 8, 0, 0),
    })

    const appointment2 = await inMemoryAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 7, 20, 9, 0, 0),
    })

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2020,
      month: 8,
      day: 20,
    })

    expect(appointments).toEqual([appointment1, appointment2])
  })
})
