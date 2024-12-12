import jwt from "jsonwebtoken";

// GENERATE TOKEN JWT
export const generateAccessToken = (user) => {
  return jwt.sign({ _id: user._id }, process.env.SECRET_ACCESS_TOKEN, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (user) => {
  return jwt.sign({ _id: user._id }, process.env.SECRET_REFRESH_TOKEN, {
    expiresIn: "1d",
  });
};

//MIDDLEWARE AUTH JWT
export const authenticate = (req, res, next) => {
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
