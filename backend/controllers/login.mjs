import asyncWrapper from "../middleware/asyncWrapper.mjs";
import bcrypt from "bcrypt";
import { userLoginModel } from "../model/model.mjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../middleware/jwtAuth.mjs";

//POST DATA LOGIN
export const postDataLogin = asyncWrapper(async (req, res) => {
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
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });

  return res.status(202).json({ message: "User successfully logged in" });
});

// LOGIN ROUTE FOR GET DATA ID FOR PRIVATE WRAPPER (JWT)
export const getDataLogin = asyncWrapper(async (req, res) => {
  const userId = req.user._id;

  const findUser = await userLoginModel.findOne({ _id: userId });

  if (!findUser) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({ userId: findUser._id });
});
