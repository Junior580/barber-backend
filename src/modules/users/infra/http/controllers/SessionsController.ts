import { Request, Response } from 'express'

import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService'
import { UsersRepository } from '../../typeorm/repositories/UsersRepository'
import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider'
import { instanceToInstance } from 'class-transformer'

export default class SessionsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const userRepo = new UsersRepository()

    const hashProvider = new BCryptHashProvider()

    const authenticateUser = new AuthenticateUserService(userRepo, hashProvider)

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    })

    // response.cookie('token', token, {
    //   httpOnly: true,
    // })

    return response.json({ user: instanceToInstance(user), token })
    // return response.json({ user: instanceToInstance(user) })
  }
}
