import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import { userLoginModel, userProductModel } from "../model/model.mjs";

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
  return jwt.sign({ _id: user._id }, process.env.SECRET_ACCESS_TOKEN, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ _id: user._id }, process.env.SECRET_REFRESH_TOKEN, {
    expiresIn: "1d",
  });
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
    const userId = req.user._id;

    const findUser = await userLoginModel.findOne({ _id: userId });

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Jakarta",
    }).format(findUser.createdAt);

    return res.status(200).json({
      name: findUser.name,
      createdAt: formattedDate,
    });
  } catch (e) {
    console.log(`error: ${e.message}`);
    res.status(500).json({ message: "Server error" });
  }
});

// SIGNUP ROUTE FOR SEND DATA
Router.post(
  `/signup`,
  //Email validation
  body("email").isEmail().withMessage("Email isn't valid.").normalizeEmail(),

  // Password validation
  body("password")
    .isLength({ min: 8 })
    .withMessage("The password must contain at least 8 characters.")
    .matches(/\d/)
    .withMessage("Password must contain number at least 1.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain symbol at least 1."),

  // Username validation
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
      res.status(500).json({ message: "Server error" });
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

    const accessToken = generateAccessToken({ _id: user._id });
    const refreshToken = generateRefreshToken({ _id: user._id });

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

    return res.status(202).json({ message: "User successfully logged in" });
  } catch (e) {
    console.log(`error: ${e.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// LOGIN ROUTE FOR GET DATA (JWT)
Router.get("/login", authenticate, async (req, res) => {
  try {
    const userId = req.user._id;

    const findUser = await userLoginModel.findOne({ _id: userId });

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ userId: findUser._id });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// REFRESH-TOKEN ROUTE
Router.post(`/refresh-token`, (req, res) => {
  const refreshToken = req.cookies.jwtRefresh;

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

    return res.status(201).json({ message: "Access token refreshed" });
  });
});

//MARKETPLACE ROUTE FOR GET EVERY DATA
Router.get(`/marketplace`, async (req, res) => {
  try {
    const products = await userProductModel.find();
    if (!products) {
      res.status(404).json({ message: "Data not found or no one sells stuff" });
    }

    const formattedProducts = products.map((product) => ({
      ...product._doc,
      price: new Intl.NumberFormat(`id-ID`, {
        style: `currency`,
        currency: `IDR`,
      }).format(product.price),
    }));

    return res
      .status(200)
      .json({ message: "Succesful get the data", products: formattedProducts });
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
});

//PRODUCT ROUTE FOR GET DATA
Router.get(`/product`, authenticate, async (req, res) => {
  try {
    const userId = req.user._id;
    const products = await userProductModel.find({ userId });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "Data not found or please add a product" });
    }

    // Format harga setiap produk secara terpisah
    const formattedProducts = products.map((product) => ({
      ...product._doc,
      price: new Intl.NumberFormat(`id-ID`, {
        style: `currency`,
        currency: `IDR`,
      }).format(product.price),
    }));

    return res.status(200).json({
      product: formattedProducts,
      message: "Succesful get the product data",
    });
  } catch (e) {
    console.log(`Error: ${e.message}`);
    return res.status(500).json({ message: "Server error" });
  }
});

//ADD PRODUCT ROUTE FOR POST DATA
Router.post(
  `/product/add`,
  authenticate,
  body("name")
    .notEmpty()
    .withMessage("Username cant be empty.")
    .isLength({ min: 3 })
    .withMessage("The username must contain at least 3 characters"),

  body("description")
    .notEmpty()
    .withMessage("Description cant be empty")
    .isLength({ min: "3" })
    .withMessage("The Description must contain at least 3 characters"),
  body("price")
    .notEmpty()
    .withMessage("Price cant be empty")
    .isNumeric()
    .withMessage("Price must be a number"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user._id;
    const { name, description, price } = req.body;

    try {
      const newProduct = new userProductModel({
        userId: userId,
        name: name,
        description: description,
        price: price,
      });

      newProduct.save();
      return res.status(200).json({ message: "Data successful added" });
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }
);

//INFORMATION ROUTE FOR GET SPESIFIC DATA
Router.get(`/information/:id`, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing ID parameter" });
    }

    const product = await userProductModel.findOne({ _id: id });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const formattedProduct = {
      ...product._doc,
      price: new Intl.NumberFormat(`ID-id`, {
        style: "currency",
        currency: `IDR`,
      }).format(product.price),
    };

    return res
      .status(200)
      .json({ product: formattedProduct, message: "Succesful get the data" });
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
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
    .json({ message: `User successful Logged out and tokens deleted` });
});

export default Router;
