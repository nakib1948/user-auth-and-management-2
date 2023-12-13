/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  let message: string = err.message;
  let errorMessage: string = err.message || 'Something went wrong!';

  if (err instanceof ZodError) {
    message = 'Validation Error';
    errorMessage = err.issues.reduce((val, argu) => {
      return (val += argu.message + '.');
    }, '');
  } else if (err?.name === 'CastError') {
    message = 'Invalid ID';
    errorMessage = `${err.stringValue} is not a valid ID!`;
  } else if (err?.code === 11000) {
    message = 'duplicate key error';
    errorMessage = err.message;
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails: err,
    stack: err?.stack,
  });
};

export default globalErrorHandler;
