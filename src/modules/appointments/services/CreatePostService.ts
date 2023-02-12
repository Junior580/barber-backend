import { Post } from '../infra/typeorm/entities/Appointment'
import { IPostRepository } from '../repositories/interfaces/IPostRepository'

//apagar
import { AppDataSource } from '../../../shared/infra/typeorm/data-source'
import AppError from '../../../shared/errors/AppError'
import { User } from '../../users/infra/typeorm/entities/Users'
export const postsRepository = AppDataSource.getRepository(Post)
export const userRepository = AppDataSource.getRepository(User)

interface IRequest {
  id: string
  tittle: string
  message: string
}
export class CreatePostService {
  public async execute({ id, tittle, message }: IRequest): Promise<Post> {
    const userExists = await userRepository.findOneBy({ id })

    if (!userExists) {
      throw new AppError('User does not exists.', 401)
    }

    const post = postsRepository.create({
      tittle,
      message,
      user: id,
    })

    await postsRepository.save(post)

    return post
  }
}
