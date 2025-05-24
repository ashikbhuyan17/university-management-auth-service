import express from 'express'

import { AcademicFacultyValidation } from './academicFaculty.validation'
import { AcademicFacultyController } from './academicFaculty.controller'
import validateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createAcademicFaculty
)
router.get('/', AcademicFacultyController.getAcademicFaculty)
router.get('/:id', AcademicFacultyController.getAcademicFacultyById)
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  AcademicFacultyController.updateAcademicFaculty
)
router.delete('/:id', AcademicFacultyController.deleteAcademicFaculty)

export const AcademicFacultyRoutes = router
