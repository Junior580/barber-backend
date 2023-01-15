import { Request, Response } from 'express'
import { UserRepository } from '../repositories/UserRepository'
import { DeleteUserService } from '../services/DeleteUserService'
export class DeleteUserController {
  public async handle(req: Request, res: Response) {
    const { id } = req.params

    const userRepo = new UserRepository()

    const user = new DeleteUserService(userRepo)

    await user.execute(id)

    return res.status(200).json('User has been deleted.')
  }
}
