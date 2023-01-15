import { Request, Response } from 'express'
import { GetUserService } from '../services/GetUserService'
import { UserRepository } from '../repositories/UserRepository'

export class GetUserController {
  public async handle(req: Request, res: Response) {
    const userRepo = new UserRepository()

    const getUser = new GetUserService(userRepo)

    const user = await getUser.execute()

    const { password: _, ...createdUser } = user

    return res.json(createdUser)
  }
}
