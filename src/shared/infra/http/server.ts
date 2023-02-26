import 'express-async-errors'
import 'reflect-metadata'
import express from 'express'

import uploadConfig from '@config/upload'

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

    app.use(rateLimiter)
    app.use(express.json())
    app.use('/files', express.static(uploadConfig.uploadsFolder))

    app.use(routes)

    app.use(errors())

    app.use(handleError)

    return app.listen(3000, () => {
      console.log('🚀 server is running!')
    })
  })
  .catch(err => {
    return console.error('❌ Error during Data Source initialization', err)
  })
