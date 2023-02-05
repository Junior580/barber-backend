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

import { DataSource, Entity, getRepository } from 'typeorm'
import { PrimaryGeneratedColumn, Column } from 'typeorm'
import { userRepository } from '../repositories/in-memory/UserRepositoryInMemory'

@Entity()
export class MyEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name?: string
}

beforeEach(() => {
  const AppDataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [MyEntity],
    synchronize: true,
    logging: false,
  })
  const userRepository = AppDataSource.getRepository(MyEntity)

  return AppDataSource
})

// afterEach(() => {
//   const conn = getConnection()
//   return conn.close()
// })

test('store Joe and fetch it', async () => {
  await userRepository.create('joe')

  const joe = await getRepository(MyEntity).find({
    where: {
      id: 1,
    },
  })
  expect(joe[0].name).toBe('Joe')
})

test('store Another and fetch it', async () => {
  await getRepository(MyEntity).insert({
    name: 'Another',
  })
  const joe = await getRepository(MyEntity).find({
    where: {
      id: 1,
    },
  })
  expect(joe[0].name).toBe('Another')
})
