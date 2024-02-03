import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'
import { UsersRepository } from '../../typeorm/repositories/UsersRepository'
import { UpdateUserAvatarService } from '@modules/users/services/UpdateUserAvatarService'
import { uploadImgProviders } from '@shared/container/providers/StorageProvider'
import uploadConfig from '../../../../../config/upload'

export class UpdateUserAvatarController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const userRepo = new UsersRepository()

    // const avatarRepo = uploadImgProviders[uploadConfig.config]
    const avatarRepo = await uploadImgProviders.disk

    const updateUserAvatar = new UpdateUserAvatarService(userRepo, avatarRepo)

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file?.filename,
    })

    return res.json({ user: instanceToInstance(user) })
  }
}
