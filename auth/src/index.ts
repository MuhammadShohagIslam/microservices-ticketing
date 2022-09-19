import express from "express";
import { json } from "body-parser";

const app = express();

// middlware
app.use(json());
console.log(json())

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
