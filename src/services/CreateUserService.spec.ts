// import { UsersRepositoryInMemory } from '../repositories/in-memory/UserRepositoryInMemory'
// import { IUsersRepository } from '../repositories/interfaces/IUserRepository'
// import { CreateUserService } from './CreateUserService'
// import { User } from '../app/entities/Users'

// describe('Create USer', () => {
//   let usersRepository: IUsersRepository
//   let createUserService: CreateUserService

//   beforeAll(() => {
//     usersRepository = new UsersRepositoryInMemory()
//     createUserService = new CreateUserService(usersRepository)
//   })

//   it('should be able to create a new user', async () => {
//     const userData = {
//       name: 'user1',
//       email: 'test@test.com.br',
//       password: 'testusername',
//     }

//     const user = await createUserService.execute(userData)

//     expect(user).toHaveProperty('id')
//     expect(user.name).toBe('user1')
//   })
// })
