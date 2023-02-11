import { User } from '../../../users/infra/typeorm/entities/Users'
import { IUsersRepository } from '../../repositories/interfaces/IUserRepository'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { v4 as uuid } from 'uuid'

export class UserRepositoryInMemory implements IUsersRepository {
  private users: User[] = []

  public async findOneByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email)

    return user
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, { id: uuid(), name, email, password })

    this.users.push(user)

    return user
  }

  public async findAll(): Promise<User[]> {
    return this.users
  }

  public async findOneById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id)

    return user
  }

  public async save(user: User): Promise<User> {
    this.users.push(user)

    return user
  }

  public async delete(id: string): Promise<void> {
    this.users.pop()
  }
}
