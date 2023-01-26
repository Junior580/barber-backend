import AppError from '../../../shared/errors/AppError'
import { IUsersRepository } from '../repositories/interfaces/IUserRepository'

export class GetUserService {
  usersRepository: IUsersRepository

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  public async execute() {
    const user = await this.usersRepository.findAll()

    if (user.length === 0) {
      throw new AppError('Nothing user.', 401)
    }

    return user
  }
}
