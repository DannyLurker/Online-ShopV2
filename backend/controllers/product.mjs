import asyncWrapper from "../middleware/asyncWrapper.mjs";
import { userProductModel } from "../model/model.mjs";
import generatedObjectId from "../utils/generatedObjectId.mjs";
import formatPrice from "../utils/formatPrice.mjs";

export const getProduct = asyncWrapper(async (req, res) => {
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
    price: formatPrice(product.price),
  }));

  return res.status(200).json({
    product: formattedProducts,
    message: "Succesful get the product data",
  });
});

export const postProduct = asyncWrapper(async (req, res) => {
  const { name, description, price } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  const newProduct = new userProductModel({
    userId: req.user._id,
    name,
    description,
    price,
    productId: generatedObjectId,
  });

  await newProduct.save();

  return res.status(200).json({ message: "Product successfully added" });
});

export const getProductEdit = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Missing ID parameter" });
  }

  const product = await userProductModel.findOne({ _id: id });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.status(200).json({ product });
});

export const editProduct = asyncWrapper(async (req, res) => {
  const { name, description, price, userId } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (!imageUrl) {
    return res.status(400).json({ message: "Image is required" });
  }

  const findProduct = await userProductModel.findOne({ _id: userId });

  if (!findProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  // if (req.file) {
  //   const oldImagePath = `.${findProduct.imageUrl}`;
  //   deleteFile(oldImagePath);
  // }

  const options = { upsert: false };

  const updateDoc = {
    name,
    description,
    price,
    productId: generatedObjectId,
  };

  await userProductModel.updateOne(findProduct, updateDoc, options);

  return res.status(200).json({ message: "Data succesful updated" });
});

export const deleteProduct = asyncWrapper(async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Missing ID parameter" });
  }

  const product = await userProductModel.findOne({ _id: id });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  await userProductModel.deleteOne(product);

  return res.status(200).json({ message: "Data succesful deleted" });
});
