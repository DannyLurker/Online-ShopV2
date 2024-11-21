import multer from "multer";
import gridFsStorage from "multer-gridfs-storage";
import mongoose, { createConnection } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const userImageStorageConnection = createConnection(
  process.env.USER_IMAGESTORAGE_DB_CONNECTION
);

// Konfigurasi GridFS
let gfs;
userImageStorageConnection.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(userImageStorageConnection.db, {
    bucketName: "uploads",
  });
});

const storage = new gridFsStorage({
  url: userImageStorageConnection,
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`,
      bucketName: "uploads",
    };
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype == `image/png` ||
      file.mimetype == `image/jpg` ||
      file.mimetype == `image/jpeg`
    ) {
      callback(null, true);
    } else {
      console.log(`Only jpg, jpeg & png file supported!`);
      callback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

export { upload, gfs };
