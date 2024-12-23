import { createConnection, mongoose, mongo } from "mongoose";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";
import generatedObjectId from "../utils/generatedObjectId.mjs";

// ENV
dotenv.config();

//CHECK THE CONNECTION
const imageStorageURL = process.env.USER_IMAGESTORAGE_DB_CONNECTION;

if (!imageStorageURL) {
  console.error(
    "ERROR: USER_IMAGESTORAGE_DB_CONNECTION is not defined in .env"
  );
  process.exit(1);
}

const userImageStorageConnection = createConnection(imageStorageURL);

userImageStorageConnection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

//CONFIGURATION GFS & MULTER
export let gfs;
userImageStorageConnection.once("open", () => {
  gfs = new mongo.GridFSBucket(userImageStorageConnection.db, {
    bucketName: "uploads",
  });
});

const storage = new GridFsStorage({
  url: imageStorageURL,
  file: async (req, file) => {
    if (!file) {
      throw new Error("File is required for storage");
    }

    const productId = generatedObjectId;

    if (!productId) {
      throw new Error("ProductId is missing");
    }
    return {
      filename: `${Date.now()}-${file.originalname}`,
      bucketName: "uploads",
      metadata: {
        productId: generatedObjectId,
      },
    };
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    if (!file) {
      console.log("No file uploaded");
      return callback(new Error("File is required"), false);
    }
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
    ) {
      callback(null, true);
    } else {
      console.log("Invalid file type:", file.mimetype);
      callback(new Error("Invalid file type"), false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});
