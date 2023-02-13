import { IUsersRepository } from '../repositories/interfaces/IUserRepository'
import AppError from '@shared/errors/AppError'

export class DeleteUserService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute(id: string) {
    const user = await this.usersRepository.findOneById(id)

    if (!user) {
      throw new AppError('User does not exists.', 401)
    }

    this.usersRepository.delete(id)
  }
}
