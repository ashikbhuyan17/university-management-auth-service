import httpStatus from 'http-status'
import { RequestHandler } from 'express'
import { AcademicSemesterService } from './academicSemester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IAcademicSemester } from './academicSemester.interface'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'

// const createAcademicSemester: RequestHandler = async (req, res, next) => {
//   try {
//     const { ...academicSemesterData } = req.body
//     const result = await AcademicSemesterService.createAcademicSemester(
//       academicSemesterData
//     )
//     res.status(201).json({ success: true, data: result })
//   } catch (error) {
//     next(error)
//   }
// }

// catchAsync high order function that return another fn, and catchAsync resolve tryCatch repeat task
const createAcademicSemester = catchAsync(async (req, res) => {
  const { ...academicSemesterData } = req.body
  // ক্লায়েন্ট থেকে পাওয়া ডেটা (req.body) কে academicSemesterData নামে একটি নতুন অবজেক্টে কপি করা হয়েছে
  const result = await AcademicSemesterService.createAcademicSemester(
    academicSemesterData
  )
  // res.status(201).json({ success: true, data: result })

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester fetched successfully !',
    data: result,
  })
})

const getAcademicSemesters: RequestHandler = catchAsync(
  async (req, res, next) => {
    /* 
    const paginationOption = {
      page: Number(req.query.page),
      limit: Number(req.query.limit),
      sortBy: req.query.sortBy,
      sortOrder: req.query.sortOrder,
    }
      pick korar reason hocce sortOrder, sortBy, page, limit sobgula diteo pare abr na dite dte pare 
      tay etake dynamic vabe pick kora hocce jathe same format e thake
    
    */

    const filters = pick(req.query, ['searchTerm'])
    console.log('🚀 ~ filter:', filters)
    const paginationOptions = pick(req.query, paginationFields)
    console.log('🚀 ~ paginationOptions:', paginationOptions)

    const result = await AcademicSemesterService.getAcademicSemesters(
      filters,
      paginationOptions
    )
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semesters retrieved successfully !',
      meta: result.meta,
      data: result.data,
    })
  }
)

const getAcademicSemesterById: RequestHandler = async (req, res, next) => {
  const id = req.params.id
  try {
    const result = await AcademicSemesterService.getAcademicSemesterById(id)
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

const updateAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    const result = await AcademicSemesterService.updateAcademicSemester(
      req.params.id,
      req.body
    )
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

const deleteAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    const result = await AcademicSemesterService.deleteAcademicSemester(
      req.params.id
    )
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

export const AcademicSemesterController = {
  createAcademicSemester,
  getAcademicSemesters,
  getAcademicSemesterById,
  updateAcademicSemester,
  deleteAcademicSemester,
}
