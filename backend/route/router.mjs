import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// INITIALIZE EXPRESS
const Router = express.Router();

// ENV
dotenv.config();

// GENERATE TOKEN JWT
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.SECRET_ACCESS_TOKEN);
};

//MIDDLEWARE AUTH JWT
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
Router.get(`/`, authenticate, (req, res) => {
  const filteredData = data.filter((user) => user.name === req.user);

  res.json(filteredData);
});

// ROUTE FOR SEND DATA
Router.post(`/login`, (req, res) => {
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

Router.delete(`/logout`, (req, res) => {
  res.clearCookie(`jwt`);
  res.status(200).json({ message: `User successfull logged out` });
});

export default Router;
