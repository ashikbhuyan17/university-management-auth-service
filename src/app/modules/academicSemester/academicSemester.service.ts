import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  console.log('🚀 ~ payload:', payload)
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

const getAcademicSemesters = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page = 1, limit = 10 } = paginationOptions
  const skip = (page - 1) * limit
  const result = await AcademicSemester.find().sort().skip(skip).limit(limit)

  const total = await AcademicSemester.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getAcademicSemesterById = async (
  id: string
): Promise<IAcademicSemester | null> => {
  return AcademicSemester.findById(id, {
    _id: 0,
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
  })
}

const updateAcademicSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  return AcademicSemester.findByIdAndUpdate(id, payload, { new: true })
}

const deleteAcademicSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  return AcademicSemester.findByIdAndDelete(id)
}

export const AcademicSemesterService = {
  createAcademicSemester,
  getAcademicSemesters,
  getAcademicSemesterById,
  updateAcademicSemester,
  deleteAcademicSemester,
}
