import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

// we can do check type with ts
// interface CustomError {
//     statusCode: number;
//     serializationError(): {
//         message: string;
//         field?: string;
//     }[];
// }
// export class RequestValidationError extends Error implements CustomError {

export class RequestValidationError extends CustomError{
    statusCode = 400;
    constructor(public errors: ValidationError[]) {
        // for logging purpose
        super("Invalid Request");

        // only because we are extending building class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializationError() {
        return this.errors.map((error) => {
            return {
                message: error.msg,
                field: error.param,
            };
        });
    }
}
