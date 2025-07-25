import express from 'express'

import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route'
import { UserRoutes } from '../modules/users/user.route'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route'
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route'
import { StudentRoutes } from '../modules/student/student.route'
import { FacultyRoutes } from '../modules/faculty/faculty.route'

const router = express.Router()

// router.use('/api/v1/users',UserRoutes)
// router.use('/api/v1/academic-semesters',AcademicSemesterRoutes)

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
