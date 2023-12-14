"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    let message = err.message;
    let errorMessage = err.message || 'Something went wrong!';
    if (err instanceof zod_1.ZodError) {
        message = 'Validation Error';
        errorMessage = err.issues.reduce((val, argu) => {
            return (val += argu.message + '.');
        }, '');
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        message = 'Invalid ID';
        errorMessage = `${err.stringValue} is not a valid ID!`;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        message = 'duplicate key error';
        errorMessage = err.message;
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        errorDetails: err,
        stack: err === null || err === void 0 ? void 0 : err.stack,
    });
};
exports.default = globalErrorHandler;
