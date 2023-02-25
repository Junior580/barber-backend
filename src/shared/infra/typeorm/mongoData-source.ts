import { DataSource } from 'typeorm'
import { Notification } from '@modules/notifications/infra/typeorm/schemas/Notification'

export const AppDataSourceMongo = new DataSource({
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'gobarber',
  useUnifiedTopology: true,
  entities: [Notification],
})
