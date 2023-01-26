import { Router } from 'express'
import { usersRoutes } from '../../../../modules/users/infra/http/routes/users.routes'
export const indexRoutes = Router()

indexRoutes.use('/', usersRoutes)
