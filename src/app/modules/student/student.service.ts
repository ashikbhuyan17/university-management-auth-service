import { IStudent } from './student.interface'
import { Student } from './student.model'

const createStudent = async (data: IStudent): Promise<IStudent> => {
  const result = await Student.create(data)
  return result
}

const getStudents = async (): Promise<IStudent[]> => {
  return Student.find()
}

const getStudentById = async (id: string): Promise<IStudent | null> => {
  return Student.findById(id)
}

const updateStudent = async (
  id: string,
  data: Partial<IStudent>
): Promise<IStudent | null> => {
  return Student.findByIdAndUpdate(id, data, { new: true })
}

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  return Student.findByIdAndDelete(id)
}

export const StudentService = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
}
