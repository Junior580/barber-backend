import { Request, Response } from 'express'
import { GetUserService } from '../../../services/GetUserService'
import { UsersRepository } from '../../typeorm/repositories/UsersRepository'
import { instanceToInstance } from 'class-transformer'

export class GetUserController {
  public async handle(req: Request, res: Response) {
    const userRepo = new UsersRepository()

    const getUser = new GetUserService(userRepo)

    const user = await getUser.execute()

    return res.json({ user: instanceToInstance(user) })
  }
}
