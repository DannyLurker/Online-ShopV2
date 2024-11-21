import multer from "multer";
import path from "path";

// CONFIGURE Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
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

export default upload;
