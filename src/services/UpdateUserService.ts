import { User } from '../app/entities/Users'
import AppError from '../errors/AppError'
import { hash } from 'bcryptjs'
import {
  IUsersRepository,
  ICreateUser,
} from '../repositories/interfaces/IUserRepository'

export class UpdateUserService {
  usersRepository: IUsersRepository

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }
  public async execute({
    id,
    name,
    email,
    password,
  }: ICreateUser): Promise<User> {
    const user = await this.usersRepository.findOneById(id)

    if (!user) {
      throw new AppError('User does not exists.', 401)
    }

    if (email) {
      const emailExists = await this.usersRepository.findOneByEmail(email)
      if (emailExists) {
        throw new AppError('Email already exists!', 401)
      }
      user.email = email
    }

    const hashedPass = await hash(password, 8)

    user.name = name ? name : user.name
    user.password = password ? hashedPass : user.password

    await this.usersRepository.save(user)

    return user
  }
}
