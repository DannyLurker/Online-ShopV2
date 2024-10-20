import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Router from "./route/router.mjs";

// INITIALIZE EXPRESS
const app = express();
const PORT = 3000;

//MIDDLEWARE
const CLIENT_ORIGIN = "http://localhost:5173";
app.use(express.json());
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

//SERVER
app.use("/", Router);

app.listen(PORT, () => {
  console.log(`Server is listening to https://localhost:${PORT}`);
});
