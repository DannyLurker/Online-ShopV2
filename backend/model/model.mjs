import mongoose, { createConnection, Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const userLoginConnection = createConnection(
  process.env.USER_LOGIN_DB_CONNECTION
);
const userProductConnection = createConnection(
  process.env.USER_PRODUCT_DB_CONNECTION
);
const userCartsConnection = createConnection(
  process.env.USER_CARTS_DB_CONNECTION
);
const userHistoryConnection = createConnection(
  process.env.USER_HISTORY_DB_CONNECTION
);

const userLoginSchema = new Schema(
  {
    name: {
      require: true,
      type: String,
    },
    email: {
      require: true,
      type: String,
    },
    password: {
      require: true,
      type: String,
    },
  },
  { timestamps: true }
);

export const userLoginModel = userLoginConnection.model(
  "user-login-OSV2",
  userLoginSchema
);

const userProductSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    require: true,
    type: String,
  },
  description: {
    require: true,
    type: String,
  },
  price: {
    require: true,
    type: Number,
    min: 1,
  },
});

export const userProductModel = userProductConnection.model(
  "user-products-OSV2",
  userProductSchema
);
