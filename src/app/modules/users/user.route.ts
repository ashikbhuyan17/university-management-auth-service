import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from './user.validation'
const router = express.Router()

router.get('/list', UserController.getUser)
router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodSchema), // this is zod validation, jeta mongoose age aro ekbar validation check dewa for security parpas
  UserController.createStudent
)
router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createFaculy
)

export const UserRoutes = router
