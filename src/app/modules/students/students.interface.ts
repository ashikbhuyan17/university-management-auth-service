import { Model } from 'mongoose';

export type IStudents = {
  id: string;
  role: string;
  password?: string;
};

export type StudentsModel = Model<IStudents, Record<string, unknown>>;
