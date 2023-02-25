import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  // OneToMany,
} from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { v4 as uuid } from 'uuid'
// import { Appointment } from '../../../../appointments/infra/typeorm/entities/Appointment'

@Entity('users', { database: 'postgres' })
export class User {
  @PrimaryColumn({ primary: true })
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  @Exclude()
  password: string

  @Column({ nullable: true })
  avatar: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  // @OneToMany(() => Appointment, appointment => appointment.user)
  // appointment: Appointment[]

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    return this.avatar
      ? `${process.env.APP_API_URL}/files/${this.avatar}`
      : null
  }

  constructor() {
    if (!this.id) {
      this.id = uuid().toUpperCase()
    }
  }
}
