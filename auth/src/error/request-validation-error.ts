

// step1 make a class of request validation error
// step2 extend with error class
// create a properties of error
// set this error into error prototype chain
export class RequestValidationError extends Error {
    constructor(private error: any) {
        super();
        Object.setPrototypeOf(this, error.prototype);
    }
}
