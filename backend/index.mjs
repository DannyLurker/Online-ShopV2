import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"; // Perbaiki dari dontenv menjadi dotenv

// INITIALIZE EXPRESS
const app = express();
const PORT = 3000;

// ENV
dotenv.config();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// GENERATE TOKEN JWT
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.SECRET_ACCESS_TOKEN);
};

const authenticate = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Token is unavailable" });
  }

  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token is invalid" });
    }

    req.user = user;
    next();
  });
};

// SERVER
const data = [
  {
    name: `enji`,
    id: 1,
  },
  {
    name: `ronaldo`,
    id: 2,
  },
];

// ROUTE FOR GET DATA
app.get(`/`, authenticate, (req, res) => {
  const filteredData = data.filter((user) => user.name === req.user);

  res.json(filteredData);
});

// ROUTE FOR SEND DATA
app.post(`/login`, (req, res) => {
  const userData = req.body.name;

  const accessToken = generateAccessToken(userData);

  res.cookie(`jwt`, accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "strict",
  });

  res.json(accessToken);
});

app.delete(`/logout`, (req, res) => {
  res.clearCookie(`jwt`);
  res.status(200).json({ message: `User successfull logged out` });
});

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
