import asyncWrapper from "../middleware/asyncWrapper.mjs";
import { userProductModel } from "../model/model.mjs";
import { products, findProducts } from "../utils/findProducts.mjs";
import formatPrice from "../utils/formatPrice.mjs";

export const getMarketPlace = asyncWrapper(async (req, res) => {
  const { search, page } = req.query;
  const limitData = 24 + page * 24;

  const productsLength = await userProductModel.find();

  await findProducts(search, limitData);

  const sampledProducts = await userProductModel.aggregate([
    { $sample: { size: 24 } },
  ]);

  if (products.length === 0 && !sampledProducts.length) {
    return res
      .status(404)
      .json({ message: "Data not found or no one sells stuff" });
  }

  const formattedProducts = products.map((product) => ({
    ...product,
    price: formatPrice(product.price),
  }));

  const formattedProductsHomePage = sampledProducts.map((product) => ({
    ...product,
    price: formatPrice(product.price),
  }));

  return res.status(200).json({
    message: "Successful get the data",
    products: formattedProducts,
    productsHomePage: formattedProductsHomePage,
    productsLength: productsLength.length,
  });
});
