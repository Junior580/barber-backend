import { AppDataSource } from '../database/data-source'
import { User } from '../app/entities/Users'
import { IUsersRepository, ICreateUser } from './interfaces/IUserRepository'

const userRepository = AppDataSource.getRepository(User)

export class UserRepository implements IUsersRepository {
  public async findOneByEmail(email: string): Promise<User | null> {
    const user = await userRepository.findOneBy({ email })

    return user
  }

  public async create({
    id,
    name,
    email,
    password,
  }: ICreateUser): Promise<User> {
    const user = userRepository.create({ id, name, email, password })

    await userRepository.save(user)

    return user
  }

  public async findAll(): Promise<User[]> {
    const user = await userRepository.find()

    return user
  }
}
