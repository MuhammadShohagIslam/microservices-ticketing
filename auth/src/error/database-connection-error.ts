import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    reason = "Database Connection Is Failed!";
    statusCode = 500;

    constructor() {
        super("Database Connection Is Failed!");

        // only because we are extending building class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializationError() {
        return [
            {
                message: this.reason,
            },
        ];
    }
}
