import { User } from '../../infra/typeorm/entities/Users'
import { IUsersRepository } from '../interfaces/IUserRepository'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
// import { v4 as uuid } from 'uuid'

export class InMemoryUserRepository implements IUsersRepository {
  public users: User[] = []

  public async findOneByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email)

    return user || null
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, { name, email, password })

    this.users.push(user)

    return user
  }

  public async findAll(): Promise<User[]> {
    return this.users
  }

  public async findOneById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id)

    return user || null
  }

  public async save(user: User): Promise<User> {
    this.users.push(user)

    return user
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async delete(id: string): Promise<void> {
    this.users.pop()
  }
}
