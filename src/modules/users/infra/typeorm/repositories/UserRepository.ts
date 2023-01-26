import { AppDataSource } from '../../../../../shared/infra/typeorm/data-source'
import { User } from '../entities/Users'
import { IUsersRepository } from '../../../repositories/interfaces/IUserRepository'
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO'

export const userRepository = AppDataSource.getRepository(User)

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
  }: ICreateUserDTO): Promise<User> {
    const user = userRepository.create({ id, name, email, password })

    await userRepository.save(user)

    return user
  }

  public async findAll(): Promise<User[]> {
    const user = await userRepository.find()

    return user
  }
  public async findOneById(id: string): Promise<User | null> {
    const user = await userRepository.findOneBy({ id })

    return user
  }

  public async save(user: User): Promise<User> {
    const userUpdated = await userRepository.save(user)
    return userUpdated
  }

  public async delete(id: string): Promise<void> {
    await userRepository.delete(id)
  }
}
