import { User } from '../../infra/typeorm/entities/Users'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'

export interface IUsersRepository {
  findOneByEmail(email: string): Promise<User | null>
  create({ id, name, email, password }: ICreateUserDTO): Promise<User>
  findAll(): Promise<User[]>
  findOneById(id: string): Promise<User | null>
  save(user: User): Promise<User>
  delete(id: string): void
}
