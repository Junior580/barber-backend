import { Request, Response } from 'express'
import { UpdateUserService } from '../../../services/UpdateUserService'
import { UsersRepository } from '../../typeorm/repositories/UsersRepository'
import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider'
import { instanceToInstance } from 'class-transformer'

export class UpdateUserController {
  public async handle(req: Request, res: Response) {
    const { id } = req.params

    const { name, email, password } = req.body

    const userRepo = new UsersRepository()

    const hashProvider = new BCryptHashProvider()

    const updateUser = new UpdateUserService(userRepo, hashProvider)

    const user = await updateUser.execute({ id, name, email, password })

    return res.status(200).json({
      msg: 'User successfully updated!',
      user: instanceToInstance(user),
    })
  }
}
