import { UserRepositoryInMemory } from '../repositories/in-memory/UserRepositoryInMemory'
import { GetUserService } from '../services/GetUserService'
import { CreateUserService } from '../services/CreateUserService'
import AppError from '../../../shared/errors/AppError'

let fakeUsersRepository: UserRepositoryInMemory
let getUser: GetUserService
let createUser: CreateUserService

describe('Get users', () => {
  beforeEach(async () => {
    fakeUsersRepository = new UserRepositoryInMemory()
    getUser = new GetUserService(fakeUsersRepository)
    createUser = new CreateUserService(fakeUsersRepository)
  })

  it('should be able to get users', async () => {
    const userCreated = await createUser.execute({
      name: 'user1',
      email: 'user1@email.com',
      password: '123456',
    })

    const user = await getUser.execute()

    expect(user[0]).toHaveProperty('id')
  })

  it('should be not able to return user if the list is empty', async () => {
    const user = await getUser.execute()
    await expect(user.length === 0).rejects.toBeInstanceOf(AppError)
  })
})
