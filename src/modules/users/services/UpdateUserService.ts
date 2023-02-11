import { User } from '../infra/typeorm/entities/Users'
import AppError from '../../../shared/errors/AppError'
import { hash } from 'bcryptjs'
import { IUsersRepository } from '../repositories/interfaces/IUserRepository'

interface IRequest {
  id: string
  name?: string
  email?: string
  password?: string
}

export class UpdateUserService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute({ id, name, email, password }: IRequest): Promise<User> {
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

    if (password) {
      const hashedPass = await hash(password, 8)
      user.password = hashedPass
    }

    user.name = name ? name : user.name

    await this.usersRepository.save(user)

    return user
  }
}
