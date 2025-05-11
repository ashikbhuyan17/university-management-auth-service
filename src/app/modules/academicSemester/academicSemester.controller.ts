import { RequestHandler } from 'express';
import * as academicSemesterService from './academicSemester.service';

export const createAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    const result = await academicSemesterService.createAcademicSemester(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getAcademicSemesters: RequestHandler = async (req, res, next) => {
  try {
    const result = await academicSemesterService.getAcademicSemesters();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getAcademicSemesterById: RequestHandler = async (req, res, next) => {
  try {
    const result = await academicSemesterService.getAcademicSemesterById(req.params.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const updateAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    const result = await academicSemesterService.updateAcademicSemester(req.params.id, req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const deleteAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    const result = await academicSemesterService.deleteAcademicSemester(req.params.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
