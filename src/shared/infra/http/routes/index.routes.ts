import { Router } from 'express'
import { usersRoutes } from '../../../../modules/users/infra/http/routes/users.routes'
import { postsRoutes } from '../../../../modules/posts/infra/http/routes/posts.routes'
export const indexRoutes = Router()

indexRoutes.use('/', usersRoutes)
indexRoutes.use('/teste', postsRoutes)
