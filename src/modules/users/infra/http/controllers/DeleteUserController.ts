import { Request, Response } from 'express'
import { DeleteUserService } from '../../../services/DeleteUserService'
import { UsersRepository } from '../../typeorm/repositories/UsersRepository'

export class DeleteUserController {
  public async handle(req: Request, res: Response) {
    const { id } = req.params

    const userRepo = new UsersRepository()

    const user = new DeleteUserService(userRepo)

    await user.execute(id)

    return res.status(200).json('User has been deleted.')
  }
}
