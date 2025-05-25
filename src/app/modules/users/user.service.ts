import config from '../../../config/index'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateFacultyId, generateStudentId } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const academicsemester = {
    year: '2025',
    code: '01',
  }
  // const id = await generateStudentId(academicsemester)
  const id = await generateFacultyId()
  user.id = id
  // default password
  if (!user.password) {
    user.password = config.default_user_pass as string //type alias , je ami sure eta string hbe
  }

  const createdUser = await User.create(user)

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create')
  }
  return createdUser
}

const getUser = async (): Promise<IUser[] | null> => {
  const userList = await User.find({})
  return userList
}
export const UserService = {
  createUser,
  getUser,
}
