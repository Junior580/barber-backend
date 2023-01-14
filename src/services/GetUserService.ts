import AppError from '../errors/AppError'
import { IUsersRepository } from '../repositories/interfaces/IUserRepository'

export class GetUserService {
  getUsersRepository: IUsersRepository

  constructor(getUsersRepository: IUsersRepository) {
    this.getUsersRepository = getUsersRepository
  }

  public async execute() {
    const user = await this.getUsersRepository.findAll()

    if (user.length === 0) {
      throw new AppError('Nothing user.', 401)
    }

    return user
  }
}
