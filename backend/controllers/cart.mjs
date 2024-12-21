import { userCartModel } from "../model/model.mjs";
import asyncWrapper from "../middleware/asyncWrapper.mjs";
import formatPrice from "../utils/formatPrice.mjs";

export const getDataCart = asyncWrapper(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    return res.status(401).json({ message: "Failed to auntheticate" });
  }

  const cartsData = await userCartModel.find({ userId: userId });

  if (cartsData.length === 0) {
    return res.status(404).json({
      message: "Data not found or You haven't added any products to your cart",
    });
  }

  const formattedCarts = cartsData.map((cart) => ({
    ...cart._doc,
    price: formatPrice(cart.price),
  }));

  return res
    .status(200)
    .json({ message: "Succesful retrieve carts data", formattedCarts });
});

export const postDataCart = asyncWrapper(async (req, res) => {
  const userId = req.user._id;
  const { name, price, description, productId, informationId } = req.body;

  if (!userId || !name || !price || !description || !productId) {
    return res.status(404).json({
      message: `Incomplete data or failed to authenticate`,
    });
  }

  const plainPrice = price.replace(/[^0-9,]/g, "").replace(",", ".");

  const formattedPrice = parseFloat(plainPrice);

  const newCart = new userCartModel({
    userId: userId,
    name,
    price: formattedPrice,
    description,
    productId,
    informationId,
  });

  await newCart.save();

  return res.status(200).json({ message: "Cart successfully added" });
});
