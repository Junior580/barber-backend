import { v4 as uuid } from 'uuid'
import { User } from '../app/entities/Users'
import { hash } from 'bcryptjs'
import { IUsersRepository } from '../repositories/interfaces/IUserRepository'
import AppError from '../errors/AppError'

interface IRequest {
  name: string
  email: string
  password: string
}

export class CreateUserSerice {
  createUsersRepository: IUsersRepository

  constructor(createUsersRepository: IUsersRepository) {
    this.createUsersRepository = createUsersRepository
  }

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userExists = await this.createUsersRepository.findOneByEmail(email)

    if (userExists) {
      throw new AppError('User already exists', 400)
    }

    const hashedPass = await hash(password, 8)

    const user = this.createUsersRepository.create({
      id: uuid(),
      email,
      name,
      password: hashedPass,
    })

    return user
  }
}
