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
