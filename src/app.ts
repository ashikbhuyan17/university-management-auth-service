import express, { Application, Request, Response } from 'express'
import cors from 'cors'
<<<<<<< HEAD
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'
import ApiError from './errors/ApiError'
=======
import usersRouter from './app/modules/users/users.route'
>>>>>>> dda208607fcb64be2ae940ece0fdf087a30eecd1
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users/', UserRoutes)

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
