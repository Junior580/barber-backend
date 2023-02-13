import 'express-async-errors'
import 'reflect-metadata'
import express from 'express'

import { AppDataSource } from '../typeorm/data-source'
import { routes } from '../http/routes/index.routes'
import { handleError } from '../http/middlewares/HandleError'
import uploadConfig from '@config/upload'

// AppDataSourceMongo.initialize()

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Data Source has been initialized!')
  })
  .then(() => {
    const app = express()

    app.use(express.json())

    app.use('/files', express.static(uploadConfig.directory))

    app.use(routes)

    app.use(handleError)

    return app.listen(3000, () => {
      console.log('🚀 server is running!')
    })
  })
  .catch(err => {
    return console.error('❌ Error during Data Source initialization', err)
  })
