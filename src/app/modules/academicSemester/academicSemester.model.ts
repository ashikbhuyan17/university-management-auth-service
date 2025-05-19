import httpStatus from 'http-status'
import { Schema, model } from 'mongoose'
import {
  IAcademicSemester,
  AcademicSemesterModel,
} from './academicSemester.interface'
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant'
import ApiError from '../../../errors/ApiError'

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: { type: String, required: true, enum: academicSemesterTitles },
    year: { type: String, required: true },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes,
    },
    startMonth: { type: String, required: true, enum: academicSemesterMonths },
    endMonth: { type: String, required: true, enum: academicSemesterMonths },
  },
  { timestamps: true }
)

// pre('save') => যখনই নতুন ডেটা save() করার চেষ্টা করা হবে, তার আগেই এই Mongoose middleware ফাংশনটা এক্সিকিউট হবে।
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })
  // ডেটাবেইসে চেক করে একই title ও year  কোনো সেমিস্টার আগে থেকেই আছে কিনা

  if (isExist) {
    // যদি একই title ও year সহ সেমিস্টার পাওয়া যায়
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic semester is already exist !'
    )
  }

  next()
})

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
)
