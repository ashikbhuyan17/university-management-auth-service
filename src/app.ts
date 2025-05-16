import httpStatus from 'http-status'
import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import router from './app/routes'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
console.log(app.get('env'))
app.use('/api/v1', router)
// app.use('/api/v1/users/', UserRoutes)
// app.use('/api/v1/academic-semesters/', AcademicSemesterRoutes)

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

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})
export default app
