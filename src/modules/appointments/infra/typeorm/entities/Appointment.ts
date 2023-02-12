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

@Entity('appointments')
export class Appointment {
  @PrimaryColumn()
  id: string

  @Column()
  provider_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User

  @Column()
  user_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column('timestamp with time zone')
  date: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  // @ManyToOne(() => User, user => user.posts, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({
  //   name: 'user_id',
  // })
  // user: User['id']

  constructor() {
    if (!this.id) {
      this.id = uuid().toUpperCase()
    }
  }
}
