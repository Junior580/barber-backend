import { Request, Response } from 'express'
import { CreateUserService } from '../../../services/CreateUserService'
import { UsersRepository } from '../../typeorm/repositories/UsersRepository'
import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider'
import { instanceToInstance } from 'class-transformer'

export class CreateUserController {
  public async handle(req: Request, res: Response) {
    const { name, email, password } = req.body

    const userRepo = new UsersRepository()

    const hashProvider = new BCryptHashProvider()

    const createUser = new CreateUserService(userRepo, hashProvider)

    const user = await createUser.execute({ name, email, password })

    return res.json({ user: instanceToInstance(user) })
  }
}
