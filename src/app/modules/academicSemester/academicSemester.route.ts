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

/**
 * ensure 1: route level : update : give me title and code both or neither
 * ensure 1: service level : mapping title : code
 */
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateAcademicSemester
)
router.get('/', AcademicSemesterController.getAcademicSemesters)
router.get('/:id', AcademicSemesterController.getAcademicSemesterById)
router.delete('/:id', AcademicSemesterController.deleteAcademicSemester)

export const AcademicSemesterRoutes = router
