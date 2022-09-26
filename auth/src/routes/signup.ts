import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { DatabaseConnectionError } from "../error/database-connection-error";
import { RequestValidationError } from "../error/request-validation-error";

const router = express.Router();

router.post(
    "/api/users/signup",
    [
        body("email").isEmail().withMessage("Email Must Be Valid!"),
        body("password")
            .trim()
            .isLength({ min: 4, max: 30 })
            .withMessage("Password Must Be Between 4 and 30 Characters!"),
    ],
    (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        const { email, password } = req.body;

        throw new DatabaseConnectionError();
        res.send("signup User!!!");
    }
);

export { router as signUpRouter };
