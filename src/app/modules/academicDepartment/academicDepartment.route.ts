import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicDepartmentValidation } from './academicDepartment.validation'
import { AcademicDepartmentController } from './academicDepartment.controller'

const router = express.Router()

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.createAcademicDepartment
)
router.get('/', AcademicDepartmentController.getAcademicDepartments)
router.get('/:id', AcademicDepartmentController.getAcademicDepartmentById)
router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.updateAcademicDepartment
)
router.delete('/:id', AcademicDepartmentController.deleteAcademicDepartment)

export const AcademicDepartmentRoutes = router
