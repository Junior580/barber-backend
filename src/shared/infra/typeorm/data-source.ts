import 'dotenv/config'
import { DataSource } from 'typeorm'

const portPostgreSQL = process.env.PORT as number | undefined

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: portPostgreSQL,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
  entities: [
    __dirname + '../../../../modules/**/infra/typeorm/entities/*.{ts,js}',
  ],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
})

// export const AppDataSourceMongo = new DataSource({
//   type: 'mongodb',
//   name: 'mongo',
//   host: 'localhost',
//   port: 27017,
//   database: 'gobarber',
//   useUnifiedTopology: true,
//   entities: [
//     __dirname + '../../../../modules/**/infra/typeorm/schemas/*.{ts,js}',
//   ],
// })
