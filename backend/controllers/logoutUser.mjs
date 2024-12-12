import asyncWrapper from "../middleware/asyncWrapper.mjs";

export const logoutUser = asyncWrapper(async (req, res) => {
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
