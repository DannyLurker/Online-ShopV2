import { userLoginModel } from "../model/model.mjs";
import asyncWrapper from "../middleware/asyncWrapper.mjs";

// HOMEPAGE ROUTE FOR GET DATA
export const getDataHomePage = asyncWrapper(async (req, res) => {
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
});
