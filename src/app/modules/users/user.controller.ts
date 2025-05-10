import { RequestHandler } from 'express'
import { UserService } from './user.service'
const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    const result = await UserService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'user created successfully!',
      data: result,
    })
  } catch (err) {
    // res.status(400).json({
    //   error: err
    // })
    next(err)
  }
}
const getUser = async (req, res) => {
  const findUser = await UserService.getUser()
  res.status(200).json({
    success: true,
    message: 'user created successfully!',
    data: findUser,
  })
}

export const UserController = {
  createUser,
  getUser,
}
