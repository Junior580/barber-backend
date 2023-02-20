// import AppError from '../../../shared/errors/AppError'

import { InMemoryUserRepository } from '@modules/users/repositories/InMemory/InMemoryUserRepository'
import { ListProvidersService } from './ListProvidersService'

let inMemoryUsersRepository: InMemoryUserRepository
let listProviders: ListProvidersService

describe('Get users', () => {
  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUserRepository()
    listProviders = new ListProvidersService(inMemoryUsersRepository)
  })

  it('should be able to list the providers', async () => {
    const user1 = await inMemoryUsersRepository.create({
      name: 'user1',
      email: 'user1@email.com',
      password: 'teste123',
    })

    const user2 = await inMemoryUsersRepository.create({
      name: 'user2',
      email: 'user2@email.com',
      password: 'teste123',
    })

    const loggedUser = await inMemoryUsersRepository.create({
      name: 'user3',
      email: 'user3@email.com',
      password: 'teste123',
    })

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    })

    expect(providers).toEqual([user1, user2])
  })
})
