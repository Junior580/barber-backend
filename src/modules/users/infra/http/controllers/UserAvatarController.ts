import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'
import { UsersRepository } from '../../typeorm/repositories/UsersRepository'
import { UpdateUserAvatarService } from '@modules/users/services/UpdateUserAvatarService'

export class UpdateUserAvatarController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const userRepo = new UsersRepository()

    const updateUserAvatar = new UpdateUserAvatarService(userRepo)

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file?.filename,
    })

    return res.json({ user: instanceToInstance(user) })
  }
}
