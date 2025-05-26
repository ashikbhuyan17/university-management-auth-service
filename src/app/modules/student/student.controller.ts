import httpStatus from 'http-status'
import { RequestHandler } from 'express'
import { StudentService } from './student.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IStudent } from './student.interface'
import { UserService } from '../users/user.service'

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { student, ...userData } = req.body
  const result = await UserService.createStudent(student, userData)

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester fetched successfully !',
    data: result,
  })
})

const getStudents: RequestHandler = async (req, res, next) => {
  try {
    const result = await StudentService.getStudents()
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

const getStudentById: RequestHandler = async (req, res, next) => {
  try {
    const result = await StudentService.getStudentById(req.params.id)
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

const updateStudent: RequestHandler = async (req, res, next) => {
  try {
    const result = await StudentService.updateStudent(req.params.id, req.body)
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

const deleteStudent: RequestHandler = async (req, res, next) => {
  try {
    const result = await StudentService.deleteStudent(req.params.id)
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

export const StudentController = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
}
