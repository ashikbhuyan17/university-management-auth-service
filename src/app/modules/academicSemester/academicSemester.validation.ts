import { z } from 'zod'

import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant'

// Academic Semester তৈরি করার সময় ইনপুট ডেটা যাচাই করার জন্য Zod স্কিমা তৈরি করা হচ্ছে
const createAcademicSemesterZodSchema = z.object({
  // পুরো বডি অবজেক্ট যাচাই করা হবে
  body: z.object({
    // title এর মান নির্ধারিত enum ভ্যালুগুলোর মধ্যে হতে হবে
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'Title is required', // যদি না দেওয়া হয়, তাহলে এই মেসেজ দেখাবে
    }),

    year: z.string({
      required_error: 'Year is required',
    }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
      required_error: 'Code is required',
    }),

    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'Start month is required',
    }),

    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'End month is required',
    }),
  }),
})

// ভ্যালিডেশন এক্সপোর্ট করা হচ্ছে যেন কন্ট্রোলারে ব্যবহার করা যায়
export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
}
