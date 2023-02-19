import { Request, Response } from 'express'

import { SendForgotPasswordEmailService } from '@modules/users/services/SendForgotPasswordEmailService'
import { UserRepository } from '../../typeorm/repositories/UsersRepository'
import { Usertoken } from ''
import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider'

export class ForgotPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const userRepo = new UserRepository()

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(userRepo)

    await sendForgotPasswordEmail.execute({
      email,
    })

    return response.status(204).json()
  }
}
