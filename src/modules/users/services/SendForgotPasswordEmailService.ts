import path from 'path'

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

    const { token } = await this.userTokensRepository.generate(user.id)

    const forgotPasswordTemplatePath = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    )

    this.mailProvider.sendMailMessage({
      to: { name: user.name, email: user.email },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplatePath,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    })
  }
}
