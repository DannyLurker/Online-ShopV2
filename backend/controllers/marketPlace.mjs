import asyncWrapper from "../middleware/asyncWrapper.mjs";
import { userProductModel } from "../model/model.mjs";

const formatPrice = (price) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);

export const getMarketPlace = asyncWrapper(async (req, res) => {
  const [products, sampledProducts] = await Promise.all([
    userProductModel.find().lean(),
    userProductModel.aggregate([{ $sample: { size: 20 } }]),
  ]);

  if (!products.length || !sampledProducts.length) {
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
  });
});
