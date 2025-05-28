import httpStatus from 'http-status'
import { RequestHandler } from 'express'
import { UserService } from './user.service'
import sendResponse from '../../../shared/sendResponse'
import { IUser } from './user.interface'
const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { student, ...userData } = req.body
    const result = await UserService.createStudent(student, userData)

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully!',
      data: result,
    })
  } catch (err) {
    // res.status(400).json({
    //   error: err
    // })
    next(err)
  }
}
const getUser: RequestHandler = async (req, res) => {
  const findUser = await UserService.getUser()
  res.status(200).json({
    success: true,
    message: 'user created successfully!',
    data: findUser,
  })
}

export const UserController = {
  createStudent,
  getUser,
}
