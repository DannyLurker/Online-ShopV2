import asyncWrapper from "../middleware/asyncWrapper.mjs";
import { gfs } from "../middleware/multer.mjs";

const downloadImage = asyncWrapper(async (req, res) => {
  const { productId } = req.query;

  const cursor = gfs.find({ "metadata.productId": { $in: productId } });

  if (!cursor.length) {
    return res.status(404).json({ message: "File not found" });
  }

  res.setHeader("Content-Type", "image/jpeg");
  res.setHeader("Content-Disposition", "inline");

  for await (let file of cursor) {
    const readStream = gfs.openDownloadStream(file._id);
    readStream.pipe(res);
  }
});

export default downloadImage;
