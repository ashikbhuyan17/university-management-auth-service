import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './user.model'

export const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1, //dec => last jey user create hyce tar id pabo
    })
    .lean() //faster mongoose query with lean

  return lastStudent?.id ? lastStudent.id.substring(4) : undefined
}

// export const generateUserId = async () => {
//     // (0).toString().padStart(5, '0') = for first time user
//     const currentId = (await findLastStudentId()) || (0).toString().padStart(5, '0') //00000
//     //increment by 1
//     const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
//     return incrementedId
// }

export const generateStudentId = async (
  academicSemester: IAcademicSemester
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0') //00000
  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  //20 25
  incrementedId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementedId}`

  return incrementedId
}

// Faculty ID
export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined
}

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0')
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementedId = `F-${incrementedId}`

  return incrementedId
}
