import { sign } from 'jsonwebtoken'
import { User } from '@modules/users/infra/typeorm/entities/Users'
import { IUsersRepository } from '@modules/users/repositories/interfaces/IUserRepository'
import AppError from '@shared/errors/AppError'
import { jwt } from '@config/auth'
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

export class AuthenticateUserService {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findOneByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password
    )

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const { secret, expiresIn } = jwt

    const token = sign({}, `${process.env.JWT_PASS}`, {
      subject: user.id,
      expiresIn,
    })

    return { user, token }
  }
}
