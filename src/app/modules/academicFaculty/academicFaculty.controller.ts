import httpStatus from 'http-status'
import { RequestHandler } from 'express'
import { AcademicFacultyService } from './academicFaculty.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IAcademicFaculty } from './academicFaculty.interface'
import pick from '../../../shared/pick'
import { academicFacultyFilterableFields } from './academicFaculty.constants'

const createAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { ...academicFacultyData } = req.body
  const result = await AcademicFacultyService.createAcademicFaculty(
    academicFacultyData
  )
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty created successfully',
    data: result,
  })
})

const getAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, academicFacultyFilterableFields)

  const result = await AcademicFacultyService.getAcademicFaculty(filters)
  res.status(200).json({ success: true, data: result })
})

const getAcademicFacultyById: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AcademicFacultyService.getAcademicFacultyById(id)
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty fetched successfully',
    data: result,
  })
})

const updateAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.updateAcademicFaculty(
    req.params.id,
    req.body
  )
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty updated successfully',
    data: result,
  })
})

const deleteAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AcademicFacultyService.deleteAcademicFaculty(id)
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty deleted successfully',
    data: result,
  })
})

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAcademicFaculty,
  getAcademicFacultyById,
  updateAcademicFaculty,
  deleteAcademicFaculty,
}
