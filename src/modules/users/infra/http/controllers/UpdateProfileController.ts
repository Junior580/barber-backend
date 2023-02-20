import { Request, Response } from 'express'
import { UpdateProfileService } from '../../../services/UpdateProfileService'
import { UsersRepository } from '../../typeorm/repositories/UsersRepository'
import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider'
import { instanceToInstance } from 'class-transformer'

export class UpdateProfileController {
  public async handle(req: Request, res: Response) {
    const user_id = req.user.id

    const { name, email, old_password, password } = req.body

    const userRepo = new UsersRepository()

    const hashProvider = new BCryptHashProvider()

    const updateUser = new UpdateProfileService(userRepo, hashProvider)

    const user = await updateUser.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    })

    return res.status(200).json({
      msg: 'User successfully updated!',
      user: instanceToInstance(user),
    })
  }
}
