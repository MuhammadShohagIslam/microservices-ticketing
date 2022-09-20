import express from 'express';

const router = express.Router();

router.post("/api/users/signin", (req, res) => {
    res.send("Sing In  User");
});

export {router as signInRouter}