import { InMemoryUserRepository } from '../repositories/InMemory/InMemoryUserRepository'
import { CreateUserService } from './CreateUserService'
import { ShowProfileService } from './ShowProfileService'
import { InMemoryHashProvider } from '../providers/HashProvider/inMemory/InMemoryHashProvider'

import AppError from '../../../shared/errors/AppError'

let fakeUsersRepository: InMemoryUserRepository
let getUser: ShowProfileService
let createUser: CreateUserService
let inMemoryHashProvider: InMemoryHashProvider

describe('Get users', () => {
  beforeEach(async () => {
    fakeUsersRepository = new InMemoryUserRepository()
    inMemoryHashProvider = new InMemoryHashProvider()

    createUser = new CreateUserService(
      fakeUsersRepository,
      inMemoryHashProvider
    )
    getUser = new ShowProfileService(fakeUsersRepository)
  })

  it('should be able to get users', async () => {
    await createUser.execute({
      name: 'user1',
      email: 'user1@email.com',
      password: '123456',
    })

    const user = await getUser.execute()

    expect(user[0]).toHaveProperty('id')
    expect(user[0]).toHaveProperty('name')
    expect(user[0]).toHaveProperty('email')
    expect(user[0]).toHaveProperty('password')
  })

  it('should be not able to return user if the list is empty', async () => {
    await expect(getUser.execute()).rejects.toBeInstanceOf(AppError)
  })
})
