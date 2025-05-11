import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

export const createAcademicSemester = async (data: IAcademicSemester): Promise<IAcademicSemester> => {
  const result = await AcademicSemester.create(data);
  return result;
};

export const getAcademicSemesters = async (): Promise<IAcademicSemester[]> => {
  return AcademicSemester.find();
};

export const getAcademicSemesterById = async (id: string): Promise<IAcademicSemester | null> => {
  return AcademicSemester.findById(id);
};

export const updateAcademicSemester = async (id: string, data: Partial<IAcademicSemester>): Promise<IAcademicSemester | null> => {
  return AcademicSemester.findByIdAndUpdate(id, data, { new: true });
};

export const deleteAcademicSemester = async (id: string): Promise<IAcademicSemester | null> => {
  return AcademicSemester.findByIdAndDelete(id);
};
