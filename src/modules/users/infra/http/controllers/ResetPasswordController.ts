import { Request, Response } from 'express'

import { ResetPasswordService } from '@modules/users/services/ResetPasswordService'
import { UsersRepository } from '../../typeorm/repositories/UsersRepository'

import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider'
import { UserTokenRepository } from '../../typeorm/repositories/UserTokensRepository'

export class ResetPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body

    const userRepo = new UsersRepository()

    const tokenRepo = new UserTokenRepository()

    const hashProvider = new BCryptHashProvider()

    const resetPasswordService = new ResetPasswordService(
      userRepo,
      tokenRepo,
      hashProvider
    )

    await resetPasswordService.execute({
      password,
      token,
    })

    return response.status(204).json()
  }
}
