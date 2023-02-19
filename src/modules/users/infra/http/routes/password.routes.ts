import { Router } from 'express'
import { ForgotPasswordController } from '../controllers/ForgotPasswordController'
import { ResetPasswordController } from '../controllers/ResetPasswordController'

export const passwordRouter = Router()

const forgotPasswordController = new ForgotPasswordController()
const resetPasswordController = new ResetPasswordController()

passwordRouter.post('/forgot', forgotPasswordController.handle)
passwordRouter.post('/reset', resetPasswordController.handle)
