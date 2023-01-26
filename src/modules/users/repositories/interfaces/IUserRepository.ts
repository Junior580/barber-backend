import { User } from '@modules/users/infra/typeorm/entities/Users'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'

export interface IUsersRepository {
  findOneByEmail(email: string): Promise<User | null>
  create({ id, name, email, password }: ICreateUserDTO): Promise<User>
  findAll(): Promise<User[]>
  findOneById(id: string): Promise<User | null>
  save(user: User): Promise<User>
  delete(id: string): void
}
