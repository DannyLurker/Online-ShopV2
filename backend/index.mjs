import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Router from "./route/router.mjs";

// INITIALIZE EXPRESS
const app = express();
const PORT = 3000;

//MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//SERVER
app.use("/", Router);

app.listen(PORT, () => {
  console.log(`Server is listening to https://localhost:${PORT}`);
});
