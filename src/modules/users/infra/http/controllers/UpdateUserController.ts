import { Request, Response } from 'express'
import { UpdateUserService } from '../../../services/UpdateUserService'
import { UserRepository } from '../../../infra/typeorm/repositories/UserRepository'
import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider'
import { instanceToInstance } from 'class-transformer'

export class UpdateUserController {
  public async handle(req: Request, res: Response) {
    const { id } = req.params

    const { name, email, password } = req.body

    const userRepo = new UserRepository()

    const hashProvider = new BCryptHashProvider()

    const updateUser = new UpdateUserService(userRepo, hashProvider)

    const user = await updateUser.execute({ id, name, email, password })

    return res.status(200).json({
      msg: 'User successfully updated!',
      user: instanceToInstance(user),
    })
  }
}
