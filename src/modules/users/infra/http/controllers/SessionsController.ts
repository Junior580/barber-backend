// index,show,create,update,delete  //o maximo que um contrller no MVC pode ter de metodos
// mais que isso é necessario criar um novo controller
import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'

import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService'
import { UserRepository } from '../../typeorm/repositories/UserRepository'

export default class SessionsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const userRepo = new UserRepository()

    const authenticateUser = new AuthenticateUserService(userRepo)

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    })

    return response.json({ user: instanceToInstance(user), token })
  }
}
