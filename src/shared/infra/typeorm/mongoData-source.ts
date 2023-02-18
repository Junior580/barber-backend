import 'dotenv/config'
import { DataSource } from 'typeorm'

const port = process.env.MONGOPORT as number | undefined

export const AppDataSourceMongo = new DataSource({
  type: 'mongodb',
  name: 'mongo',
  host: process.env.MONGODB_HOST,
  port: port,
  database: process.env.MONGODATABASE,
  useUnifiedTopology: true,
  entities: [
    __dirname + '../../../../modules/**/infra/typeorm/schemas/*.{ts,js}',
  ],
})
