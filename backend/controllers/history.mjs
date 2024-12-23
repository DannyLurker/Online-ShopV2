import asyncWrapper from "../middleware/asyncWrapper.mjs";
import { userHistoryModel } from "../model/model.mjs";
import formatPrice from "../utils/formatPrice.mjs";

export const getDataHistory = asyncWrapper(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    return res.status(401).json({ message: "Failed to authenticate" });
  }

  const findData = await userHistoryModel.find({ userId: userId });

  if (!findData) {
    return res.status(404).json({ message: "You haven't bought any product" });
  }

  const formattedData = findData.map((data) => ({
    ...data._doc,
    price: formatPrice(data.price),
    createdAt: new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Jakarta",
    }).format(data.createdAt),
  }));

  return res.status(200).json({
    message: "Succesfuly retrieve data history",
    historyData: formattedData,
  });
});

export const postDataHistory = asyncWrapper(async (req, res) => {
  const userId = req.user._id;
  const { name, price } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Failed to authenticate" });
  }

  const plainPrice = price.replace(/[^0-9,]/g, "").replace(",", ".");

  const formattedPrice = parseFloat(plainPrice);

  const newHistory = new userHistoryModel({
    userId: userId,
    name,
    price: formattedPrice,
  });

  await newHistory.save();
  return res.status(201).json({ message: "Succefuly added data" });
});

export const deleteDataHistory = asyncWrapper(async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(404).json({ message: "Id does not exist" });
  }

  const findData = await userHistoryModel.findOne({ _id: id });

  if (!findData) {
    return res.status(404).json({ message: "Item not found" });
  }

  await userHistoryModel.deleteOne(findData);
  return res.status(202).json({ message: "Data succesfuly deleted" });
});
