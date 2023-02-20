import { User } from '@modules/users/infra/typeorm/entities/Users'
import { IUsersRepository } from '@modules/users/repositories/interfaces/IUserRepository'
import AppError from '@shared/errors/AppError'

interface IListProvidersRequest {
  user_id: string
}

type IListProvidersResponse = User[]

export class ListProvidersService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute({
    user_id,
  }: IListProvidersRequest): Promise<IListProvidersResponse> {
    const users = await this.usersRepository.findAllProviders({
      expect_user_id: user_id,
    })

    if (!users) {
      throw new AppError('User not found')
    }

    return users
  }
}
