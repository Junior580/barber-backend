import { InMemoryUserRepository } from '../repositories/InMemory/InMemoryUserRepository'
import { CreateUserService } from '../services/CreateUserService'
import { DeleteUserService } from '../services/DeleteUserService'
import AppError from '../../../shared/errors/AppError'

let fakeUsersRepository: InMemoryUserRepository
let deleteUser: DeleteUserService
let createUser: CreateUserService

describe('delete users', () => {
  beforeEach(async () => {
    fakeUsersRepository = new InMemoryUserRepository()
    deleteUser = new DeleteUserService(fakeUsersRepository)
    createUser = new CreateUserService(fakeUsersRepository)
  })

  it('should be able to delete an existing user', async () => {
    await createUser.execute({
      name: 'user1',
      email: 'user1@email.com',
      password: '123456',
    })

    const userID = fakeUsersRepository.users[0].id

    const user = await deleteUser.execute(userID)

    expect(user).toBe(undefined)
  })

  it('should not able to delete if user does not exists', async () => {
    await expect(deleteUser.execute('nonExistentID')).rejects.toBeInstanceOf(
      AppError
    )
  })
})
