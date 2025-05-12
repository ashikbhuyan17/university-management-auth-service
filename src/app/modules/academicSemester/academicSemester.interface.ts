import { Model } from 'mongoose'
// literal union type
// Literal type নির্দিষ্ট কিছু মানকে টাইপ হিসেবে ব্যবহার করতে দেয়।
// A literal is a notation for representing a fixed value in the source code.
export type IAcademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type IAcademicSemesterTitles = 'Autumn' | 'Summer' | 'Fall'

export type IAcademicSemesterCodes = '01' | '02' | '03'

export type IAcademicSemester = {
  title: IAcademicSemesterTitles
  year: number
  code: IAcademicSemesterCodes
  startMonth: IAcademicSemesterMonths
  endMonth: IAcademicSemesterMonths
}

export type AcademicSemesterModel = Model<
  IAcademicSemester,
  Record<string, unknown>
>
