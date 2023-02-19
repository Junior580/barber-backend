import { IUsersRepository } from '../repositories/interfaces/IUserRepository'
import { IUserTokensRepository } from '../repositories/interfaces/IUserTokensRepository'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import AppError from '@shared/errors/AppError'

interface IRequest {
  email: string
}

export class SendForgotPasswordEmailService {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findOneByEmail(email)

    if (!user) {
      throw new AppError('User does not exists.', 401)
    }

    await this.userTokensRepository.generate(user.id)

    this.mailProvider.sendMail(email, 'Pedido de recuperaçao de senha recebido')
  }
}
