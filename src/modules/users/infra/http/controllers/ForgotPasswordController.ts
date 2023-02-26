import { Request, Response } from 'express'

import mailConfig from '@config/mail'

import { SendForgotPasswordEmailService } from '@modules/users/services/SendForgotPasswordEmailService'
import { UsersRepository } from '../../typeorm/repositories/UsersRepository'
import { UserTokenRepository } from '../../typeorm/repositories/UserTokensRepository'

// import { EtherealMailProvider } from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider'
// import { SESMailProvider } from '@shared/container/providers/MailProvider/implementations/SESMailProvider'
// import { HandlebarsMailTemplateProvider } from '@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider'

import { emailProviders } from '@shared/container/providers/MailProvider'

export class ForgotPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const userRepo = new UsersRepository()

    const mailProvider = emailProviders[mailConfig.driver]

    const tokenRepo = new UserTokenRepository()

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      userRepo,
      mailProvider,
      tokenRepo
    )

    await sendForgotPasswordEmail.execute({
      email,
    })

    return response.status(204).json()
  }
}
