import { Request, Response } from 'express'
import { ShowProfileService } from '../../../services/ShowProfileService'
import { UsersRepository } from '../../typeorm/repositories/UsersRepository'
import { instanceToInstance } from 'class-transformer'

export class ShowProfileController {
  public async handle(req: Request, res: Response) {
    const user_id = req.user.id

    const userRepo = new UsersRepository()

    const getUser = new ShowProfileService(userRepo)

    const user = await getUser.execute({ user_id })

    return res.json({ user: instanceToInstance(user) })
  }
}
