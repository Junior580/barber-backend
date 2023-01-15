import { Request, Response } from 'express'
import { UserRepository } from '../repositories/UserRepository'
import { UpdateUserService } from '../services/UpdateUserService'

export class UpdateUserController {
  public async handle(req: Request, res: Response) {
    const { id } = req.params

    const { name, email, password } = req.body

    const userRepo = new UserRepository()

    const updateUser = new UpdateUserService(userRepo)

    const user = await updateUser.execute({ id, name, email, password })

    return res.status(200).json({ msg: 'User successfully updated!', user })
  }
}
