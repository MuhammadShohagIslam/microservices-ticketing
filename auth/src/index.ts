import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./router/current-user";
import { signInRouter } from "./router/signIn";
import { signUpRouter } from "./router/signUp";
import { signOutRouter } from "./router/signOut";
import { customeError } from "./middlewares/custome-error";

const app = express();

app.use(json());

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);

app.use(customeError);

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
