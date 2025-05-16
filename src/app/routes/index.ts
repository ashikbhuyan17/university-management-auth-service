import express from 'express'

import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route'
import { UserRoutes } from '../modules/users/user.route'

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
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
