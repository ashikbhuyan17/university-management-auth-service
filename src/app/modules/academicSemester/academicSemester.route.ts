import express from 'express';
import * as academicSemesterController from './academicSemester.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  academicSemesterController.createAcademicSemester
);
router.get('/', academicSemesterController.getAcademicSemesters);
router.get('/:id', academicSemesterController.getAcademicSemesterById);
router.put('/:id', academicSemesterController.updateAcademicSemester);
router.delete('/:id', academicSemesterController.deleteAcademicSemester);

export default router;
