import { Schema, model } from 'mongoose';
import { IAcademicSemester, AcademicSemesterModel } from './academicSemester.interface';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String },
  },
  { timestamps: true }
);

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>('AcademicSemester', academicSemesterSchema);
