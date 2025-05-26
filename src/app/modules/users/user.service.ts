import config from '../../../config/index'
import ApiError from '../../../errors/ApiError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateFacultyId, generateStudentId } from './user.utils'

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // const id = await generateStudentId(academicsemester)

  // default password
  if (!user.password) {
    user.password = config.default_student_pass as string //type alias , je ami sure eta string hbe
  }
  // set role
  user.role = 'student'

  // set student id generate by academic semester
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester // Reference to AcademicSemester -> _id
  ).lean()


  //generate student id
  const id = await generateStudentId(academicSemester)


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
  createStudent,
  getUser,
}
