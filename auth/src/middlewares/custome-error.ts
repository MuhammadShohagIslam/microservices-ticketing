import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import {RequestValidationError} from '../error/request-validation-error'

export const customeError = (
    error: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if(typeof RequestValidationError){
       return res.status(400).json({
            errors: error.map(err => {
                return {
                    message: err.errro,
                    field: error.params
                }
            })
        })
    }
    next();
};
