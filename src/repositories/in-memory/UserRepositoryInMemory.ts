// import { User } from '../../app/entities/Users'
// import { ICreateUser, IUsersRepository } from '../interfaces/IUserRepository'
// import { v4 as uuid } from 'uuid'

// export class UsersRepositoryInMemory implements IUsersRepository {
//   private users: User[] = []
//   public async findOneByEmail(email: string): Promise<User | null> {
//     throw new Error('Method not implemented.')
//   }
//   public async create({
//     id,
//     name,
//     email,
//     password,
//   }: ICreateUser): Promise<User> {
//     const user = {
//       id: uuid(),
//       name: name,
//       email: email,
//       password: password,
//       created_at: new Date(),
//       updated_at: new Date(),
//     }

//     this.users.push(user)

//     return user
//   }
//   public async findAll(): Promise<User[]> {}
//   public async findOneById(id: string): Promise<User | null> {}
//   public async save(user: User): Promise<User> {}
//   public async delete(id: string): Promise<void> {}
// }
