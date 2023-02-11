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

    const user = await createUser.execute({
      name: 'user1',
      email: 'user1@email.com',
      password: '123456',
    })
  })

  it('should be able to get users', async () => {
    const user = await getUser.execute()

    expect(user[0]).toHaveProperty('id')
  })
  it('should be not able to return user if the list is empty', async () => {
    const user = await createUser.execute({
      name: 'user1',
      email: 'user1@email.com',
      password: '123456',
    })

    expect(user).toHaveProperty('id')

    await expect(
      createUser.execute({
        name: 'user1',
        email: 'user1@email.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
