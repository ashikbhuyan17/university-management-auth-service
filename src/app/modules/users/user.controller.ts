// import httpStatus from 'http-status'
// import { RequestHandler } from 'express'
// import { UserService } from './user.service'
// import sendResponse from '../../../shared/sendResponse'
// import { IUser } from './user.interface'
// import catchAsync from '../../../shared/catchAsync'
// const createStudent: RequestHandler = async (req, res, next) => {
//   try {
//     const { student, ...userData } = req.body
//     const result = await UserService.createStudent(student, userData)

//     sendResponse<IUser>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Student created successfully!',
//       data: result,
//     })
//   } catch (err) {
//     // res.status(400).json({
//     //   error: err
//     // })
//     next(err)
//   }
// }
// const createFaculy: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const { faculty, ...userData } = req.body
//     const result = await UserService.createFaculty(faculty, userData)

//     sendResponse<IUser>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Faculty created successfully!',
//       data: result,
//     })
//   }
// )
// const getUser: RequestHandler = async (req, res) => {
//   const findUser = await UserService.getUser()
//   res.status(200).json({
//     success: true,
//     message: 'user created successfully!',
//     data: findUser,
//   })
// }

// export const UserController = {
//   createStudent,
//   getUser,
// }

import { Request, Response } from 'express'
import { RequestHandler } from 'express-serve-static-core'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IUser } from './user.interface'
import { UserService } from './user.service'

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body
    const result = await UserService.createStudent(student, userData)

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully!',
      data: result,
    })
  }
)

const createFaculy: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body
    const result = await UserService.createFaculty(faculty, userData)

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty created successfully!',
      data: result,
    })
  }
)

// const createAdmin: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const { admin, ...userData } = req.body
//     const result = await UserService.createAdmin(admin, userData)

//     sendResponse<IUser>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Admin created successfully!',
//       data: result,
//     })
//   }
// )

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
  createFaculy,
  // createAdmin,
  getUser,
}
