import { hash } from 'bcryptjs'
import { User } from '../infra/typeorm/entities/Users'
import { IUsersRepository } from '../repositories/interfaces/IUserRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  name: string
  email: string
  password: string
}

export class CreateUserService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findOneByEmail(email)

    if (userExists) {
      throw new AppError('User already exists', 400)
    }

    const hashedPass = await hash(password, 8)

    const user = this.usersRepository.create({
      email,
      name,
      password: hashedPass,
    })

    return user
  }
}
