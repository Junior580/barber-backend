import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { v4 as uuid } from 'uuid'
import { User } from '../../../../users/infra/typeorm/entities/Users'

@Entity('posts')
export class Post {
  @PrimaryColumn()
  id: string

  @Column()
  tittle: string

  @Column()
  message: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @ManyToOne(() => User, user => user.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: User['id']

  constructor() {
    if (!this.id) {
      this.id = uuid().toUpperCase()
    }
  }
}
