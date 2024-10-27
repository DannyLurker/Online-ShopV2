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
  return jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, { expiresIn: "15m" });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.SECRET_REFRESH_TOKEN, { expiresIn: "1d" });
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
      return res.status(400).json({ error: errors.array() });
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
        .json({ message: "New user data successfully created and stored" });
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

    // AWAIT IS NECESSARY
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({ message: "Password or email is wrong" });
    }

    const accessToken = generateAccessToken({ email: user.email });
    const refreshToken = generateRefreshToken({ email: user.email });

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("jwtRefresh", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.status(202).json({ message: "User successfully logged in" });
  } catch (e) {
    console.log(`error: ${e.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// LOGIN ROUTE FOR GET DATA (JWT)
Router.get("/login", authenticate, async (req, res) => {
  try {
    const userEmail = req.user.email;

    const findUser = await userLoginModel.findOne({ email: userEmail });

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ userId: findUser._id });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// REFRESH-TOKEN ROUTE
Router.post(`/refresh-token`, (req, res) => {
  const refreshToken = req.cookies.jwtRefresh;
  console.log(refreshToken);

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is unavailable" });
  }

  jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Refresh token is invalid" });
    }

    const accessToken = generateAccessToken({ email: user.email });

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: "Access token refreshed" });
  });
});

//LOGOUT
Router.delete(`/logout`, (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });

  res.clearCookie("jwtRefresh", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res
    .status(202)
    .json({ message: `User successful Llgged out and tokens deleted` });
});

export default Router;
