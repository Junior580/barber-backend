import { IUsersRepository } from '../repositories/interfaces/IUserRepository'
import { IUserTokensRepository } from '../repositories/interfaces/IUserTokensRepository'
import { hash } from 'bcryptjs'

import AppError from '@shared/errors/AppError'

interface IRequest {
  password: string
  token: string
}

export class ResetPasswordService {
  constructor(
    private usersRepository: IUsersRepository,
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('User token does not exists')
    }

    const user = await this.usersRepository.findOneById(userToken.user_id)

    if (!user) {
      throw new AppError('User  does not exists')
    }

    user.password = password

    await this.usersRepository.save(user)
  }
}
