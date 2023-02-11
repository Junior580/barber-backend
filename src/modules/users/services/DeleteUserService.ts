import AppError from '../../../shared/errors/AppError'
import { IUsersRepository } from '../repositories/interfaces/IUserRepository'

export class DeleteUserService {
  constructor(private readonly usersRepository: IUsersRepository) {}
  public async execute(id: string) {
    const user = await this.usersRepository.findOneById(id)

    if (!user) {
      throw new AppError('User does not exists.', 401)
    }

    await this.usersRepository.delete(id)
  }
}
