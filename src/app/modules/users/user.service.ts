import httpStatus from 'http-status'
import mongoose from 'mongoose'
import config from '../../../config/index'
import ApiError from '../../../errors/ApiError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'
import { Student } from '../student/student.model'

/**
 * project overview:
 => ey project e user type ache, user type er moddhe student, faculty, admin and sobgula ke user model e store kora hobe.
  user model er moddhe sobgula user er id thakbe, jemon student er id, faculty er id, admin er id.
 scenario:
 payload : { password: '123',student: { ... } }  => {student,...userData}
  1. Create a student 
  2. Generate student id using academic semester
  3. Set default password if not provided
  4. Set role as student
  5. Create student and user in a transaction

 * This service handles user-related operations such as creating students and get student  _id then use _id  reference in user model.
 */
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

  let newUserAllData = null
  // using Transaction and Rollback check => https://ashik17.hashnode.dev/mongodb-transaction-rollback
  const session = await mongoose.startSession() // Session start
  try {
    session.startTransaction() // Start transaction

    //generate student id
    const id = await generateStudentId(academicSemester)
    // user and student id same in database
    user.id = id // set user id
    student.id = id // set student id

    //its returns a array of student
    const newStudent = await Student.create([student], { session }) // create student
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    user.student = newStudent[0]._id // set student _id into user.student
    const newUser = await User.create([user], { session }) // create user
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    newUserAllData = newUser[0] // get user data
    await session.commitTransaction() // Commit transaction
    await session.endSession() // End session
  } catch (error) {
    await session.abortTransaction() // Rollback transaction
    await session.endSession() // End session
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create user'
    )
  }

  if (newUserAllData) {
    // populate student data with academic semester, academic department and academic faculty
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student', // populate student data
      populate: [
        {
          path: 'academicSemester', // populate academic semester data
        },
        {
          path: 'academicDepartment', // populate academic department data
        },
        {
          path: 'academicFaculty', // populate academic faculty data
        },
      ],
    })
  }
  return newUserAllData
}

const getUser = async (): Promise<IUser[] | null> => {
  const userList = await User.find({})
  return userList
}
export const UserService = {
  createStudent,
  getUser,
}
