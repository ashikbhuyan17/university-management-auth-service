import express from 'express'
import { AcademicSemesterValidation } from './academicSemester.validation'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterController } from './academicSemester.controller'

const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createAcademicSemester
)
router.get('/', AcademicSemesterController.getAcademicSemesters)
router.get('/:id', AcademicSemesterController.getAcademicSemesterById)
router.put('/:id', AcademicSemesterController.updateAcademicSemester)
router.delete('/:id', AcademicSemesterController.deleteAcademicSemester)

export const AcademicSemesterRoutes = router
