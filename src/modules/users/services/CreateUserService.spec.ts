import { InMemoryUserRepository } from '../repositories/inMemory/InMemoryUserRepository'
import { CreateUserService } from '../services/CreateUserService'
import { InMemoryHashProvider } from '../providers/HashProvider/inMemory/InMemoryHashProvider'

import AppError from '../../../shared/errors/AppError'

let fakeUsersRepository: InMemoryUserRepository
let createUser: CreateUserService
let inMemoryHashProvider: InMemoryHashProvider

describe('Create User', () => {
  beforeEach(() => {
    fakeUsersRepository = new InMemoryUserRepository()
    inMemoryHashProvider = new InMemoryHashProvider()

    createUser = new CreateUserService(
      fakeUsersRepository,
      inMemoryHashProvider
    )
  })

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'user1',
      email: 'user1@email.com',
      password: '123456',
    })
    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('name')
    expect(user).toHaveProperty('email')
    expect(user).toHaveProperty('password')
  })

  it('should be not able to create a new user with same email from another one', async () => {
    await createUser.execute({
      name: 'user1',
      email: 'user1@email.com',
      password: '123456',
    })

    await expect(
      createUser.execute({
        name: 'user1',
        email: 'user1@email.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
