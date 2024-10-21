import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import { userLoginModel } from "../model/model.mjs";

// INITIALIZE EXPRESS
const Router = express.Router();

// MIDDLEWARE
const CLIENT_ORIGIN = "http://localhost:5173";
Router.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
);
Router.use(cookieParser());
Router.use(express.json());

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

// HOME ROUTE FOR GET DATA
Router.get(`/`, authenticate, async (req, res) => {
  try {
    const userEmail = req.user.email;

    const findUser = await userLoginModel.findOne({ email: userEmail });

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      name: findUser.name,
      createdAt: findUser.createdAt,
    });
  } catch (e) {
    console.log(`error: ${e.message}`);
  }
});

// SIGNUP ROUTE FOR SEND DATA
Router.post(
  `/signup`,
  body("email").isEmail().withMessage("Email isn't valid.").normalizeEmail(),

  // Validasi password
  body("password")
    .isLength({ min: 8 })
    .withMessage("The password must contain at least 8 characters.")
    .matches(/\d/)
    .withMessage("Password must contain number at least 1.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain symbol at least 1."),

  // Validasi username
  body("name")
    .notEmpty()
    .withMessage("Username cant be empty.")
    .isLength({ min: 3 })
    .withMessage("The username must contain at least 3 characters"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;

      const findUser = await userLoginModel.findOne({ email });

      if (findUser) {
        return res.status(409).json({ message: "Email has been used" });
      }

      const saltRounds = 16;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new userLoginModel({
        name: name,
        email: email,
        password: hashedPassword,
      });

      newUser.save();
      return res
        .status(201)
        .json({ message: "Data successfully created and stored" });
    } catch (e) {
      console.log(`error: ${e.message}`);
    }
  }
);

// LOGIN ROUTE FOR SEND DATA
Router.post(`/login`, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userLoginModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Password or email is wrong" });
    }

    const accessToken = generateAccessToken({ email: user.email });

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(202).json({ message: "User successfully logged in" });
  } catch (e) {
    console.log(`error: ${e.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//LOGOUT
Router.delete(`/logout`, (req, res) => {
  res.clearCookie(`jwt`);
  res.status(200).json({ message: `User successfull logged out` });
});

export default Router;
