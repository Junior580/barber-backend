import { IUsersRepository } from '../repositories/interfaces/IUserRepository'
import { User } from '../infra/typeorm/entities/Users'
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import AppError from '@shared/errors/AppError'

interface IRequest {
  user_id: string
  avatarFilename?: string
}

export class UpdateUserAvatarService {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findOneById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401)
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }

    if (!avatarFilename) {
      throw new AppError('Invalid avatar.', 401)
    }

    const filename = await this.storageProvider.saveFile(avatarFilename)

    user.avatar = filename

    await this.usersRepository.save(user)

    return user
  }
}
