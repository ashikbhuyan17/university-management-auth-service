import { RequestHandler } from 'express';
import * as studentsService from './students.service';

export const createStudents: RequestHandler = async (req, res, next) => {
  try {
    const result = await studentsService.createStudents(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getStudentss: RequestHandler = async (req, res, next) => {
  try {
    const result = await studentsService.getStudentss();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getStudentsById: RequestHandler = async (req, res, next) => {
  try {
    const result = await studentsService.getStudentsById(req.params.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const updateStudents: RequestHandler = async (req, res, next) => {
  try {
    const result = await studentsService.updateStudents(req.params.id, req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const deleteStudents: RequestHandler = async (req, res, next) => {
  try {
    const result = await studentsService.deleteStudents(req.params.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
