import { Schema, model } from 'mongoose'
import {
  IAcademicFaculty,
  AcademicFacultyModel,
} from './academicFaculty.interface'

const academicFacultySchema = new Schema<
  IAcademicFaculty,
  AcademicFacultyModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    // syncId: {
    //   type: String,
    //   required: false,
    //   unique: true,
    // },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema
)
