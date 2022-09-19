import express from "express";
import { json } from "body-parser";

const app = express();

// middlware
app.use(json());

app.get("/api/users/currentuser", (req, res) => {
    console.log("Hi There!");
    res.send("ngix");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
