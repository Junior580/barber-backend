import { Post } from '../infra/typeorm/entities/Posts'
import { IPostRepository } from '../repositories/interfaces/IPostRepository'

export class CreateUserService {
  constructor(private readonly usersRepository: IPostRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<Post> {
    const userExists = await this.usersRepository.findOneByEmail(email)

    // if (userExists) {
    //   throw new AppError('User already exists', 400)
    // }

    // const hashedPass = await hash(password, 8)

    // const user = this.usersRepository.create({
    //   id: uuid().toUpperCase(),
    //   email,
    //   name,
    //   password: hashedPass,
    // })

    // return user
  }
}
