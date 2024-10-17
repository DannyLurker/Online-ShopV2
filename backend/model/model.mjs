import mongoose, { createConnection, Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const userLoginConnection = createConnection(
  process.env.USER_LOGIN_DB_CONNECTION
);
const userSellProductConnection = createConnection(
  process.env.USER_SELLPRODUCTS_DB_CONNECTION
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
