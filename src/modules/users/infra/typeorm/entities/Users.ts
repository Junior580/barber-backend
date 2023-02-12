import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { Exclude } from 'class-transformer'
import { v4 as uuid } from 'uuid'
import { Appointment } from '../../../../appointments/infra/typeorm/entities/Appointment'

@Entity('users')
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

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  // @OneToMany(() => Appointment, appointment => appointment.user)
  // appointment: Appointment[]

  constructor() {
    if (!this.id) {
      this.id = uuid().toUpperCase()
    }
  }
}
