import asyncWrapper from "../middleware/asyncWrapper.mjs";
import { userProductModel } from "../model/model.mjs";

export const getInformaiton = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Missing ID parameter" });
  }

  const product = await userProductModel.findOne({ _id: id });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
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
});
