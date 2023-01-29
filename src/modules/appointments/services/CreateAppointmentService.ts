export class CreateUserService {
  usersRepository: IUsersRepository

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findOneByEmail(email)

    if (userExists) {
      throw new AppError('User already exists', 400)
    }

    const hashedPass = await hash(password, 8)

    const user = this.usersRepository.create({
      id: uuid().toUpperCase(),
      email,
      name,
      password: hashedPass,
    })

    return user
  }
}
