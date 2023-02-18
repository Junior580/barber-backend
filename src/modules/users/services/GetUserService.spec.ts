import { InMemoryUserRepository } from '../repositories/InMemory/InMemoryUserRepository'
import { CreateUserService } from '../services/CreateUserService'
import { GetUserService } from '../services/GetUserService'
import AppError from '../../../shared/errors/AppError'

let fakeUsersRepository: InMemoryUserRepository
let getUser: GetUserService
let createUser: CreateUserService

describe('Get users', () => {
  beforeEach(async () => {
    fakeUsersRepository = new InMemoryUserRepository()
    getUser = new GetUserService(fakeUsersRepository)
    createUser = new CreateUserService(fakeUsersRepository)
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
