import { InMemoryUserRepository } from '../repositories/in-memory/InMemoryUserRepository'
import { CreateUserService } from '../services/CreateUserService'
import AppError from '../../../shared/errors/AppError'

let fakeUsersRepository: InMemoryUserRepository
let createUser: CreateUserService

describe('Create User', () => {
  beforeEach(() => {
    fakeUsersRepository = new InMemoryUserRepository()
    createUser = new CreateUserService(fakeUsersRepository)
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
