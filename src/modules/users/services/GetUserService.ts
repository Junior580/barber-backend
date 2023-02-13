import { IUsersRepository } from '../repositories/interfaces/IUserRepository'
import AppError from '@shared/errors/AppError'

export class GetUserService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute() {
    const user = await this.usersRepository.findAll()

    if (user.length === 0) {
      throw new AppError('Nothing user.', 401)
    }

    return user
  }
}
