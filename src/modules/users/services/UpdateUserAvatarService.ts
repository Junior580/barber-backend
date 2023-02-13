import { IUsersRepository } from '../repositories/interfaces/IUserRepository'
import { User } from '../infra/typeorm/entities/Users'
import AppError from '@shared/errors/AppError'
import path from 'path'
import upload from '@config/upload'
import fs from 'fs'

interface IRequest {
  user_id: string
  avatarFilename: string | undefined
}

export class UpdateUserAvatarService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findOneById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401)
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(upload.directory, user.avatar)
      const userAvatarExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    if (!avatarFilename) {
      throw new AppError('Invalid avatar.', 401)
    }

    user.avatar = avatarFilename

    await this.usersRepository.save(user)

    return user
  }
}
