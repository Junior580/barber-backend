import { Router } from 'express'
import { usersRoutes } from '@modules/users/infra/http/routes/users.routes'
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes'
import { appointmentsRouter } from '@modules/appointments/infra/http/routes/appointments.routes'
import { passwordRouter } from '@modules/users/infra/http/routes/password.routes'
import { profileRouter } from '@modules/users/infra/http/routes/profile.routes'
import { providersRouter } from '@modules/appointments/infra/http/routes/providers.routes'

export const routes = Router()

routes.use('/appointments', appointmentsRouter)
routes.use('/providers', providersRouter)
routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter)

// apagar
import { Request, Response } from 'express'
import { AppDataSourceMongo } from '../../typeorm/mongoData-source'
import { Notification } from '@modules/notifications/infra/typeorm/schemas/Notification'
import { MongoRepository } from 'typeorm'

const mongoRepo = AppDataSourceMongo.getMongoRepository(Notification)

routes.post('/teste', async (req: Request, res: Response) => {
  try {
    const notification = new Notification()
    notification.content = `Novo agendamento para dia `
    notification.recipient_id = 'bumbum'
    console.log(notification)

    await AppDataSourceMongo.manager.save(notification)
    console.log(notification)
    return res.json(notification)
  } catch (error) {
    console.log(error)
    return res.json(error).status(400)
  }
})
