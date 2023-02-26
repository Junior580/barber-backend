import { User } from '@modules/users/infra/typeorm/entities/Users'
import { IUsersRepository } from '@modules/users/repositories/interfaces/IUserRepository'
import { ICacheProvider } from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import AppError from '@shared/errors/AppError'

interface IListProvidersRequest {
  user_id: string
}

type IListProvidersResponse = User[]

export class ListProvidersService {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly cacheProvider: ICacheProvider
  ) {}

  public async execute({
    user_id,
  }: IListProvidersRequest): Promise<IListProvidersResponse> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list: ${user_id}`
    )

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        expect_user_id: user_id,
      })

      await this.cacheProvider.save(`providers-list: ${user_id}`, users)
    }

    if (!users) {
      throw new AppError('User not found')
    }

    return users
  }
}
