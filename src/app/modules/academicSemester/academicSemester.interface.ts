import { Model } from 'mongoose';

export type IAcademicSemester = {
  id: string;
  role: string;
  password?: string;
};

export type AcademicSemesterModel = Model<IAcademicSemester, Record<string, unknown>>;
