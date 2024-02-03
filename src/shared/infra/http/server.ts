import 'dotenv/config'

import 'express-async-errors'
import 'reflect-metadata'
import express from 'express'

import uploadConfig from '@config/upload'
import cors from 'cors'

import { errors } from 'celebrate'
import { AppDataSource } from '../typeorm/data-source'
import { AppDataSourceMongo } from '../typeorm/mongoData-source'
import { routes } from '../http/routes/index.routes'
import { handleError } from './middlewares/handleError'
import { rateLimiter } from './middlewares/rateLimiter'

AppDataSource.initialize()
  .then(() => {
    AppDataSourceMongo.initialize()

    console.log('📦 Data Source has been initialized!')
  })
  .then(() => {
    const app = express()

    app.use(cors())

    app.use(express.json())
    app.use(rateLimiter)
    app.use('/files', express.static(uploadConfig.uploadsFolder))

    app.use('/api', routes)

    app.use(errors())

    app.use(handleError)

    const port = 3333

    return app.listen(port, () => {
      console.log(`🚀 server is running on ${port}!`)
    })
  })
  .catch(err => {
    return console.error('❌ Error during Data Source initialization', err)
  })
