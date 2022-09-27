import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../error/bad-request-error";
import { RequestValidationError } from "../error/request-validation-error";
import { User } from "../models/user";

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
    async (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        const { email, password } = req.body;

        const exist = await User.findOne({ email });

        if (exist) {
            throw new BadRequestError("Email Is Already Exist!")
        }

        const newUser = User.build({ email, password });
        await newUser.save()

        res.send(newUser);
    }
);

export { router as signUpRouter };
