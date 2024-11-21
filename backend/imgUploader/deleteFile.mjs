import fs from "fs";

// Deleting old image file
const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err.message}`);
    } else {
      console.log(`File ${filePath} successfully deleted.`);
    }
  });
};

export default deleteFile;
