import { Router } from 'express'
import { usersRoutes } from './users.routes'

export const indexRoutes = Router()

indexRoutes.use('/', usersRoutes)
