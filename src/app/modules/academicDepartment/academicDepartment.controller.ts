import httpStatus from 'http-status'
import { RequestHandler } from 'express'
import { AcademicDepartmentService } from './academicDepartment.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IAcademicDepartment } from './academicDepartment.interface'
import pick from '../../../shared/pick'
import { academicDepartmentFilterableFields } from './academicDepartment.constants'
import { paginationFields } from '../../../constants/pagination'

const createAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const { ...academicDepartmentData } = req.body
    const result = await AcademicDepartmentService.createAcademicDepartment(
      academicDepartmentData
    )

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department created successfully',
      data: result,
    })
  }
)

const getAcademicDepartments: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, academicDepartmentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcademicDepartmentService.getAcademicDepartments(
    filters,
    paginationOptions
  )

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic departments fetched successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getAcademicDepartmentById: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params
    const result = await AcademicDepartmentService.getAcademicDepartmentById(id)

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department fetched successfully',
      data: result,
    })
  }
)

const updateAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params
    const result = await AcademicDepartmentService.updateAcademicDepartment(
      id,
      req.body
    )

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department updated successfully',
      data: result,
    })
  }
)

const deleteAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params
    const result = await AcademicDepartmentService.deleteAcademicDepartment(id)

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department deleted successfully',
      data: result,
    })
  }
)

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAcademicDepartments,
  getAcademicDepartmentById,
  updateAcademicDepartment,
  deleteAcademicDepartment,
}
