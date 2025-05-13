import { RequestHandler } from 'express'
import { AcademicSemesterService } from './academicSemester.service'

const createAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body
    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemesterData
    )
    res.status(201).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

const getAcademicSemesters: RequestHandler = async (req, res, next) => {
  try {
    const result = await AcademicSemesterService.getAcademicSemesters()
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

const getAcademicSemesterById: RequestHandler = async (req, res, next) => {
  const id = req.params.id
  try {
    const result = await AcademicSemesterService.getAcademicSemesterById(id)
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

const updateAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    const result = await AcademicSemesterService.updateAcademicSemester(
      req.params.id,
      req.body
    )
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

const deleteAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    const result = await AcademicSemesterService.deleteAcademicSemester(
      req.params.id
    )
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

export const AcademicSemesterController = {
  createAcademicSemester,
  getAcademicSemesters,
  getAcademicSemesterById,
  updateAcademicSemester,
  deleteAcademicSemester,
}
