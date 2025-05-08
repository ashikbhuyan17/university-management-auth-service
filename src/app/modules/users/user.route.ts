import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from './user.validation'
const router = express.Router()

router.get('/list', UserController.getUser)

router.post(
  '/create-user',
  // validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
)

export const UserRoutes = router
