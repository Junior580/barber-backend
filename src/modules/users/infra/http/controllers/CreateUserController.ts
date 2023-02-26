import { Request, Response } from 'express'
import { CreateUserService } from '../../../services/CreateUserService'
import { UsersRepository } from '../../typeorm/repositories/UsersRepository'
import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider'
import { instanceToInstance } from 'class-transformer'
import { RedisCacheProvider } from '@shared/container/providers/CacheProvider/implementations/RedisCacheProvider'

export class CreateUserController {
  public async handle(req: Request, res: Response) {
    const { name, email, password } = req.body

    const userRepo = new UsersRepository()

    const hashProvider = new BCryptHashProvider()

    const cacheProvider = new RedisCacheProvider()

    const createUser = new CreateUserService(
      userRepo,
      hashProvider,
      cacheProvider
    )

    const user = await createUser.execute({ name, email, password })

    return res.json({ user: instanceToInstance(user) })
  }
}
