import asyncWrapper from "../middleware/asyncWrapper.mjs";
import { gfs } from "../middleware/multer.mjs";
import { userImageStorageConnection } from "../middleware/multer.mjs";
import mongoose from "mongoose";
import { products, findProducts } from "../utils/findProducts.mjs";

export const downloadOneImage = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Missing ID parameter" });
  }

  const objectId = new mongoose.Types.ObjectId(id);

  const file = await userImageStorageConnection
    .collection("uploads.files")
    .findOne({ "metadata.productId": objectId });

  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }

  if (!file.contentType.startsWith("image/")) {
    return res.status(400).json({ message: "Not an image file" });
  }

  gfs.openDownloadStream(file._id).pipe(res);
});

export const downloadManyImage = asyncWrapper(async (req, res) => {
  const { search, page } = req.query;
  const limitData = 24 + page * 24;

  const arrayGfs = [];

  const cursor = gfs
    .find({})
    .skip(page * 24)
    .limit(24);
  for await (const doc of cursor) {
    arrayGfs.push(doc);
  }

  if (arrayGfs.length === 0) {
    return res.status(404).json({ message: "File not found" });
  }

  let isError = false;
  for (const file of arrayGfs) {
    const { filename, contentType, metadata } = file;
    const productId = metadata.productId;

    if (contentType.startsWith("image/")) {
      gfs.openDownloadStream(file._id).pipe(res);
    } else {
      if (!isError) {
        isError = true;
        return res.status(400).json({ message: "Not an image file" });
      }
    }
  }
});
