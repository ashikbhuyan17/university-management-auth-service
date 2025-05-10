import { IStudents } from './students.interface';
import { Students } from './students.model';

export const createStudents = async (data: IStudents): Promise<IStudents> => {
  const result = await Students.create(data);
  return result;
};

export const getStudentss = async (): Promise<IStudents[]> => {
  return Students.find();
};

export const getStudentsById = async (id: string): Promise<IStudents | null> => {
  return Students.findById(id);
};

export const updateStudents = async (id: string, data: Partial<IStudents>): Promise<IStudents | null> => {
  return Students.findByIdAndUpdate(id, data, { new: true });
};

export const deleteStudents = async (id: string): Promise<IStudents | null> => {
  return Students.findByIdAndDelete(id);
};
