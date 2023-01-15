import AppError from '../errors/AppError'
import { IUsersRepository } from '../repositories/interfaces/IUserRepository'

export class DeleteUserService {
  usersRepository: IUsersRepository
  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }
  public async execute(id: string) {
    const user = await this.usersRepository.findOneById(id)

    if (!user) {
      throw new AppError('User does not exists.', 401)
    }

    await this.usersRepository.delete(id)
  }
}
