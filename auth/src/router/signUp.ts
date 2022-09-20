import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../error/request-validation-error";
const router = express.Router();

router.post(
    "/api/users/signup",
    body("email").isEmail(),
    body("password").isLength({ min: 4, max: 30 }),
    (req: Request, res: Response) => {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors)
        }
        const { email, password } = req.body;
        
        throw new Error("Database connection failed!")

        res.status(500).send("Database Connection Failed!");
        res.status(200).send("User is Created!");
    }
);

export { router as signUpRouter };
