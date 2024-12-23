import asyncWrapper from "../middleware/asyncWrapper.mjs";
import { userLoginModel } from "../model/model.mjs";

export const getDataWallet = asyncWrapper(async (req, res) => {
  const userId = req.user._id;

  const findUser = await userLoginModel.findOne({ _id: userId });

  if (!findUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const formattedNumber = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(findUser.wallet);

  return res.status(200).json({
    name: findUser.name,
    wallet: formattedNumber,
  });
});

export const walletFormatNumber = asyncWrapper(async (req, res) => {
  const { balance } = req.body;

  const formattedNumber = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(balance + balance * 0.11);

  return res.status(200).json({
    unFormatBalance: balance,
    balance: formattedNumber,
  });
});

export const postDataWallet = asyncWrapper(async (req, res) => {
  const userId = req.user._id;
  const { balance } = req.body;

  const findUser = await userLoginModel.findOne({ _id: userId });

  if (!findUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const options = { upsert: false };

  const updateDoc = {
    $inc: { wallet: balance },
  };

  await userLoginModel.updateOne(findUser, updateDoc, options);

  return res.status(200).json({ message: "Data succesful updated" });
});

export const changeDataWallet = asyncWrapper(async (req, res) => {
  const userId = req.user?._id;
  const { price } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Authenticate failed" });
  }

  if (!price || typeof price !== "string") {
    return res
      .status(400)
      .json({ message: "Price is required and must be a string" });
  }

  const findUser = await userLoginModel.findOne({ _id: userId });

  if (!findUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const plainPrice = price.replace(/[^0-9,]/g, "").replace(",", ".");
  const formattedPrice = parseFloat(plainPrice);

  if (isNaN(formattedPrice)) {
    return res.status(400).json({ message: "Invalid price format" });
  }

  if (findUser.wallet < formattedPrice) {
    return res.status(400).json({ message: "Insufficient balance in wallet" });
  }

  const updateDoc = {
    $inc: { wallet: -formattedPrice },
  };
  const options = { upsert: false };

  await userLoginModel.updateOne({ _id: userId }, updateDoc, options);

  res.status(200).json({ message: "Wallet updated successfully" });
});
