import { Request, Response } from 'express'
import { GetUserService } from '../../../services/GetUserService'
import { UserRepository } from '../../typeorm/repositories/UsersRepository'
import { instanceToInstance } from 'class-transformer'

export class GetUserController {
  public async handle(req: Request, res: Response) {
    const userRepo = new UserRepository()

    const getUser = new GetUserService(userRepo)

    const user = await getUser.execute()

    return res.json({ user: instanceToInstance(user) })
  }
}
