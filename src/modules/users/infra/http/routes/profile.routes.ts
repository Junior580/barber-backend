import { Router } from 'express'
import { ShowProfileController } from '../controllers/ShowProfileController'
import { UpdateProfileController } from '../controllers/UpdateProfileController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export const profileRouter = Router()
const showUserController = new ShowProfileController()
const updateProfileController = new UpdateProfileController()

profileRouter.use(ensureAuthenticated)

profileRouter.get('/', showUserController.handle)
profileRouter.put('/', updateProfileController.handle)
