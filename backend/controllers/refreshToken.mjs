import asyncWrapper from "../middleware/asyncWrapper.mjs";
import { generateAccessToken } from "../middleware/jwtAuth.mjs";
import jwt from "jsonwebtoken";

const postDataRefreshToken = asyncWrapper(async (req, res) => {
  const refreshToken = req.cookies.jwtRefresh;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is unavailable" });
  }

  jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Refresh token is invalid" });
    }

    const accessToken = generateAccessToken({ _id: user._id });

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(201).json({ message: "Access token refreshed" });
  });
});

export default postDataRefreshToken;
