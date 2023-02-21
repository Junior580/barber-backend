import { Router } from 'express'

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { ProvidersController } from '../controllers/ProvidersController'
import { ProviderMonthAvailabilityController } from '../controllers/ProviderMonthAvailabilityController'
import { ProviderDayAvailabilityController } from '../controllers/ProviderDayAvailabilityController'

export const providersRouter = Router()

const providersController = new ProvidersController()
const providerMonthAvailabilityController =
  new ProviderMonthAvailabilityController()
const providerDayAvailabilityController =
  new ProviderDayAvailabilityController()

providersRouter.use(ensureAuthenticated)

providersRouter.get('/', providersController.handle)
providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.handle
)
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.handle
)
