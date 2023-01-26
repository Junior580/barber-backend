import { Request, Response } from 'express'
import { CreateUserService } from '../../../services/CreateUserService'
import { UserRepository } from '../../../infra/typeorm/repositories/UserRepository'

export class CreateUserController {
  public async handle(req: Request, res: Response) {
    const { name, email, password } = req.body

    const userRepo = new UserRepository()

    const createUser = new CreateUserService(userRepo)

    const user = await createUser.execute({ name, email, password })

    const { password: _, ...userReturn } = user

    return res.status(201).json(userReturn)
  }
}
