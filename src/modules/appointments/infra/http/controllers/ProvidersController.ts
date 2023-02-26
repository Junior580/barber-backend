import { Request, Response } from 'express'
import { ListProvidersService } from '../../../services/ListProvidersService'
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository'
import { RedisCacheProvider } from '@shared/container/providers/CacheProvider/implementations/RedisCacheProvider'

export class ProvidersController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const userRepo = new UsersRepository()

    const cacheProvider = new RedisCacheProvider()

    const listProviders = new ListProvidersService(userRepo, cacheProvider)

    const providers = await listProviders.execute({ user_id })

    return response.json(providers)
  }
}
