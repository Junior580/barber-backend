import { Router } from 'express'
import { usersRoutes } from '@modules/users/infra/http/routes/users.routes'
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes'

export const routes = Router()

routes.use('/', usersRoutes)
routes.use('/sessions', sessionsRouter)
