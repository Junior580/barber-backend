import { InMemoryUserRepository } from '../repositories/in-memory/InMemoryUserRepository'
import { CreateUserService } from '../services/CreateUserService'
import { UpdateUserService } from '../services/UpdateUserService'
import AppError from '../../../shared/errors/AppError'

let fakeUsersRepository: InMemoryUserRepository
let createUser: CreateUserService
let updateUser: UpdateUserService

describe('update users', () => {
  beforeEach(async () => {
    fakeUsersRepository = new InMemoryUserRepository()
    createUser = new CreateUserService(fakeUsersRepository)
    updateUser = new UpdateUserService(fakeUsersRepository)
  })

  it('should be able to update an existing user', async () => {
    await createUser.execute({
      name: 'user1',
      email: 'user1@email.com',
      password: '123456',
    })

    const userID = fakeUsersRepository.users[0].id

    const user = await updateUser.execute({
      id: userID,
      name: 'user2',
      email: 'user2@email.com',
      password: '123456',
    })

    expect(user.name).toBe('user2')
    expect(user.email).toBe('user2@email.com')
    expect(user).toHaveProperty('password')
  })

  it('should not able to update with the same email', async () => {
    await createUser.execute({
      name: 'user1',
      email: 'user1@email.com',
      password: '123456',
    })

    const userID = fakeUsersRepository.users[0].id

    await expect(
      updateUser.execute({
        id: userID,
        name: 'user1',
        email: 'user1@email.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should  not able to update if user does not exists', async () => {
    await expect(
      updateUser.execute({
        id: 'nonExistentID',
        name: 'user2',
        email: 'user1@email.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
