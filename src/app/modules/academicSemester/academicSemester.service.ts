import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant'
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { number } from 'zod'
import { SortOrder } from 'mongoose'

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

const getAcademicSemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters

  // ?page=1&limit=2&sortBy=code&sortOrder=asc
  // const { page = 1, limit = 10 } = paginationOptions
  // const skip = (page - 1) * limit
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions) //dynamic and reused

  const andConditions = [] //implicit and $and
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    //partial match
    /*
      andConditions.push({
        $or: [
          {
            //  $options: 'i' => case sensitive and matching
            title: { $regex: searchTerm, $options: 'i' },
            code: { $regex: searchTerm, $options: 'i' },
            year: { $regex: searchTerm, $options: 'i' },
          },
        ],
      })
      dynamic vabe search kora hocce and conditions er moddhe
      academicSemesterSearchableFields er moddhe jekono ekta field e searchTerm thakle  
      seita match korbe
      jemon: title, code, year
      
    */

    andConditions.push({
      // accept any  searchTerm which we are set in academicSemesterSearchableFields
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    })
  }

  /*
    Filter = exact match
    Filter needs $and for filtering in specified fields
  */

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([key, value]) => ({
        [key]: value,
      })),
      // $and: [{ title: filtersData.title }, { year: filtersData.year }],
    })
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {} //createdAt will be desc order
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder // sortBy: 'createdAt', sortOrder: 'desc'
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}
  // const result = await AcademicSemester.find({ $and: andConditions })
  const result = await AcademicSemester.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

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
  const result = await AcademicSemester.findById(id, {
    _id: 0,
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
  })
  return result
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
