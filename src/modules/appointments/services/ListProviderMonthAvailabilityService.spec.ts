// import AppError from '../../../shared/errors/AppError'

import { InMemoryAppointmentsRepository } from '../repositories/inMemory/inMemoryAppointmentsRepository'
import { ListProviderMonthAvailabilityService } from './ListProviderMonthAvailabilityService'

let inMemoryAppointmentsRepository: InMemoryAppointmentsRepository
let listProvidersMonthAvailability: ListProviderMonthAvailabilityService

describe('List Provider Month Availability', () => {
  beforeEach(async () => {
    inMemoryAppointmentsRepository = new InMemoryAppointmentsRepository()
    listProvidersMonthAvailability = new ListProviderMonthAvailabilityService(
      inMemoryAppointmentsRepository
    )
  })

  it('should be able to list the month availability from provider', async () => {
    await inMemoryAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '12345',
      date: new Date(2020, 4, 20, 8, 0, 0),
    })

    await inMemoryAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '12345',
      date: new Date(2020, 4, 20, 9, 0, 0),
    })

    await inMemoryAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '12345',
      date: new Date(2020, 4, 20, 10, 0, 0),
    })

    await inMemoryAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '12345',
      date: new Date(2020, 4, 20, 11, 0, 0),
    })

    await inMemoryAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '12345',
      date: new Date(2020, 4, 20, 12, 0, 0),
    })

    await inMemoryAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '12345',
      date: new Date(2020, 4, 20, 13, 0, 0),
    })

    await inMemoryAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '12345',
      date: new Date(2020, 4, 20, 14, 0, 0),
    })

    await inMemoryAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '12345',
      date: new Date(2020, 4, 20, 15, 0, 0),
    })

    await inMemoryAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '12345',
      date: new Date(2020, 4, 20, 16, 0, 0),
    })

    await inMemoryAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '12345',
      date: new Date(2020, 4, 20, 17, 0, 0),
    })

    await inMemoryAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '12345',
      date: new Date(2020, 4, 21, 8, 0, 0),
    })

    const availability = await listProvidersMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ])
    )
  })
})
