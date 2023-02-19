import { Request, Response } from 'express'

import { ResetPasswordService } from '@modules/users/services/ResetPasswordService'
import { UsersRepository } from '../../typeorm/repositories/UsersRepository'
import { Usertoken } from ''
import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider'

export class ResetPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body

    const userRepo = new UsersRepository()

    const resetPasswordService = new ResetPasswordService(userRepo)

    await resetPasswordService.execute({
      password,
      token,
    })

    return response.status(204).json()
  }
}
