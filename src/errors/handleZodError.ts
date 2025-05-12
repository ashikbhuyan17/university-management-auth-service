import { ZodError, ZodIssue } from 'zod'
import { IGenericErrorResponse } from '../interfaces/common'
import { IGenericErrorMessage } from '../interfaces/error'

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  console.log(
    '🚀 ~ consterrors:IGenericErrorMessage[]=error.issues.map ~ error.issues.map:',
    error.issues.map(issue => issue.path)
  )
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    }
  })
  console.log(
    '🚀 ~ consterrors:IGenericErrorMessage[]=error.issues.map ~ errors:',
    errors
  )

  const statusCode = 400

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleZodError
