import { userProductModel } from "../model/model.mjs";

export let products;
export const findProducts = async (search, limitData) => {
  if (search) {
    products = await userProductModel
      .find({
        name: { $regex: search, $options: "i" },
      })
      .limit(limitData)
      .lean();
  } else {
    products = await userProductModel.aggregate([
      { $sample: { size: limitData } },
    ]);
  }
};
