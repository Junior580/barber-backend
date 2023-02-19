import { Request, Response } from 'express'

import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService'
import { UserRepository } from '../../typeorm/repositories/UsersRepository'
import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider'
import { instanceToInstance } from 'class-transformer'

export default class SessionsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const userRepo = new UserRepository()

    const hashProvider = new BCryptHashProvider()

    const authenticateUser = new AuthenticateUserService(userRepo, hashProvider)

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    })

    return response.json({ user: instanceToInstance(user), token })
  }
}
