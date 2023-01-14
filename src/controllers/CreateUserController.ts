import { Request, Response } from 'express'
import { CreateUserSerice } from '../services/CreateUserService'
import { UserRepository } from '../repositories/UserRepository'

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body

    const userRepo = new UserRepository()

    const createUser = new CreateUserSerice(userRepo)

    const user = await createUser.execute({ name, email, password })

    const { password: _, ...createdUser } = user

    return res.status(201).json(createdUser)
  }
}
