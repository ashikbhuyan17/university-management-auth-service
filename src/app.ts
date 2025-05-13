import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'
import ApiError from './errors/ApiError'
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
console.log(app.get('env'))
app.use('/api/v1/users/', UserRoutes)
app.use('/api/v1/academic-semesters/', AcademicSemesterRoutes)

//Testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully')
})
// app.get('/', (req: Request, res: Response) => {
//   throw new ApiError(400, 'ore baba error')
//   //next('next function er bitore kichu likle eta error bujay ja global error handle kore') //Error
// })
//global error handler
app.use(globalErrorHandler)
export default app
