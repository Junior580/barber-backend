import { Post } from '../../infra/typeorm/entities/Appointment'
// import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'

export interface IPostRepository {
  create({ id, name, email, password }: ICreateUserDTO): Promise<Post>
  findAll(): Promise<Post[]>
  findOneById(id: string): Promise<Post | null>
  save(user: Post): Promise<Post>
  delete(id: string): void
}
