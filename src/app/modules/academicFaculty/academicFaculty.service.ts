import { academicFacultySearchableFields } from './academicFaculty.constants'
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'

const createAcademicFaculty = async (
  data: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(data)
  return result
}

const getAcademicFaculty = async (
  filters: IAcademicFacultyFilters
): Promise<IAcademicFaculty[]> => {
  const { searchTerm, ...filtersData } = filters
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: academicFacultySearchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([key, value]) => ({
        [key]: value,
      })),
    })
  }
  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  return AcademicFaculty.find(whereConditions)
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
