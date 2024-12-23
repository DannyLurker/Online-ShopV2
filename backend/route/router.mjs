import express from "express";
import cookieParser from "cookie-parser";
import { authenticate } from "../middleware/jwtAuth.mjs";
import { upload } from "../middleware/multer.mjs";
import { getDataHomePage } from "../controllers/homepage.mjs";
import {
  validateSignup,
  handleValidationErrors,
  validateProduct,
} from "../middleware/express-validator.mjs";
import postDataSingUp from "../controllers/signup.mjs";
import { errorHandler } from "../middleware/errorHandler.mjs";
import { postDataLogin, getDataLogin } from "../controllers/login.mjs";
import postDataRefreshToken from "../controllers/refreshToken.mjs";
import { getMarketPlace } from "../controllers/marketPlace.mjs";
import {
  deleteProduct,
  editProduct,
  getProduct,
  getProductEdit,
  postProduct,
} from "../controllers/product.mjs";
import { getInformaiton } from "../controllers/information.mjs";
import { logoutUser } from "../controllers/logoutUser.mjs";
import downloadImage from "../controllers/downloadImage.mjs";
import {
  changeDataWallet,
  getDataWallet,
  postDataWallet,
  walletFormatNumber,
} from "../controllers/wallet.mjs";
import {
  deleteDataCart,
  getDataCart,
  postDataCart,
} from "../controllers/cart.mjs";
import {
  deleteDataHistory,
  getDataHistory,
  postDataHistory,
} from "../controllers/history.mjs";

// INITIALIZE EXPRESS
const Router = express.Router();

// MIDDLEWARE
Router.use(cookieParser());
Router.use("/uploads", express.static("uploads"));
Router.use(express.json());
Router.use(express.urlencoded({ extended: true }));
Router.use(errorHandler);

// HOMEPAGE ROUTE FOR GET DATA
Router.get(`/`, authenticate, getDataHomePage);

// SIGNUP ROUTE FOR SEND DATA
Router.post(`/signup`, validateSignup, handleValidationErrors, postDataSingUp);

// LOGIN ROUTE FOR SEND DATA
Router.post(`/login`, postDataLogin);

// LOGIN ROUTE FOR GET DATA ID FOR PRIVATE WRAPPER (JWT)
Router.get("/login", authenticate, getDataLogin);

// WALLET ROUTE FOR GET DATA
Router.get("/wallet", authenticate, getDataWallet);

// WALLET ROUTE FOR POST DATA
Router.post("/wallet/topup", authenticate, postDataWallet);

// WALLET ROUTE FOR FORMAT NUMBER
Router.post("/wallet/formatNumber", walletFormatNumber);

// WALLET ROUTE FOR CHANGE DATA
Router.put("/wallet/changeData", authenticate, changeDataWallet);

// REFRESH-TOKEN ROUTE
Router.post(`/refresh-token`, postDataRefreshToken);

// MARKETPLACE ROUTE FOR GET EVERY DATA
Router.get(`/marketplace`, getMarketPlace);

// CART ROUTE FOR GET DATA
Router.get("/cart", authenticate, getDataCart);

// CART ROUTE FOR POST DATA
Router.post(`/cart/postData`, authenticate, postDataCart);

// CART ROUTE FOR DELETE DATA
Router.delete(`/cart/deleteData`, deleteDataCart);

// MARKETPLACE ROUTE FOR DOWNLOAD IMAGE
Router.get(`/imageDownload`, downloadImage);

// PRODUCT ROUTE FOR GET DATA
Router.get(`/product`, authenticate, getProduct);

// ADD PRODUCT ROUTE FOR POST DATA
Router.post(
  `/product/add`,
  authenticate,
  upload.single("image"),
  validateProduct,
  handleValidationErrors,
  postProduct
);

// ADD PRODUCT ROUTE FOR DELETE DATA
Router.delete(`/product/delete`, deleteProduct);

// INFORMATION ROUTE FOR GET SPESIFIC DATA
Router.get(`/information/:id`, getInformaiton);

// GET DATA FOR EDIT PRODUCT ROUTE
Router.get(`/product/edit/:id`, getProductEdit);

// PUT DATA FOR EDIT PRODUCT ROUTE
Router.put(
  `/product/edit/:id`,
  upload.single("image"),
  validateProduct,
  editProduct
);

// HISTORY ROUTE FOR GET DATA
Router.get(`/history`, authenticate, getDataHistory);

// HISTORY ROUTE FOR POST DATA
Router.post(`/history/addData`, authenticate, postDataHistory);

// HISTORY ROUTE FOR DELETE DATA
Router.delete(`/history/deleteData`, deleteDataHistory);

// LOGOUT
Router.delete(`/logout`, logoutUser);

export default Router;
