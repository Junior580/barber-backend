import { User } from '../../app/entities/Users'

export interface ICreateUser {
  id: string
  name: string
  email: string
  password: string
}

export interface IUsersRepository {
  findOneByEmail(email: string): Promise<User | null>
  create({ id, name, email, password }: ICreateUser): Promise<User>
  findAll(): Promise<User[]>
}
