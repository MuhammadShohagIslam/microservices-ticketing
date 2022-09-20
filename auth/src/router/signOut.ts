import express, { Response, Request } from "express";

const router = express.Router();

router.put("/api/users/signout", (req: Request, res: Response) => {
    res.send("Sing Out User");
});

export { router as signOutRouter };
