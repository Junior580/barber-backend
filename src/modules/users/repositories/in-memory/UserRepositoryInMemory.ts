import { User } from '../../infra/typeorm/entities/Users'
import { IUsersRepository } from '../interfaces/IUserRepository'
import { ICreateUserDTO } from '../../../users/dtos/ICreateUserDTO'

export class UserRepository implements IUsersRepository {
  private users: User[] = []

  public async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.this.userRepository.findOneBy({ email })

    return user
  }

  public async create({
    id,
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.userRepository.create({ id, name, email, password })

    await this.userRepository.save(user)

    return user
  }

  public async findAll(): Promise<User[]> {
    const user = await this.userRepository.find()

    return user
  }
  public async findOneById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id })

    return user
  }

  public async save(user: User): Promise<User> {
    const userUpdated = await this.userRepository.save(user)
    return userUpdated
  }

  public async delete(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}
