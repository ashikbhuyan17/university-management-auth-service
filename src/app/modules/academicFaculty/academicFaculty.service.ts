import { IAcademicFaculty } from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'

const createAcademicFaculty = async (
  data: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(data)
  return result
}

const getAcademicFaculty = async (): Promise<IAcademicFaculty[]> => {
  return AcademicFaculty.find()
}

const getAcademicFacultyById = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  return AcademicFaculty.findById(id)
}

const updateAcademicFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  return AcademicFaculty.findByIdAndUpdate(id, payload, { new: true })
}

const deleteAcademicFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  return AcademicFaculty.findByIdAndDelete(id)
}

export const AcademicFacultyService = {
  createAcademicFaculty,
  getAcademicFaculty,
  getAcademicFacultyById,
  updateAcademicFaculty,
  deleteAcademicFaculty,
  // insertIntoDBFromEvent,
  // updateOneInDBFromEvent,
  // deleteOneFromDBFromEvent
}
