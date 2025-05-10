import { Schema, model } from 'mongoose';
import { IStudents, StudentsModel } from './students.interface';

const studentsSchema = new Schema<IStudents>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String },
  },
  { timestamps: true }
);

export const Students = model<IStudents, StudentsModel>('Students', studentsSchema);
