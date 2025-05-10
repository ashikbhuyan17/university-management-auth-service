import express from 'express';
import * as studentsController from './students.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { StudentsValidation } from './students.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(StudentsValidation.createStudentsZodSchema),
  studentsController.createStudents
);
router.get('/', studentsController.getStudentss);
router.get('/:id', studentsController.getStudentsById);
router.put('/:id', studentsController.updateStudents);
router.delete('/:id', studentsController.deleteStudents);

export default router;
