import express from 'express'

import { StudentValidation } from './student.validation'
import validateRequest from '../../middlewares/validateRequest'
import { StudentController } from './student.controller'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(StudentValidation.createStudentZodSchema),
  StudentController.createStudent
)
router.get('/', StudentController.getStudents)
router.get('/:id', StudentController.getStudentById)
router.put('/:id', StudentController.updateStudent)
router.delete('/:id', StudentController.deleteStudent)

export default router
