import mongoose, { createConnection, Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const userLoginConnection = createConnection(
  process.env.USER_LOGIN_DB_CONNECTION
);
export const userProductConnection = createConnection(
  process.env.USER_PRODUCT_DB_CONNECTION
);
export const userCartsConnection = createConnection(
  process.env.USER_CARTS_DB_CONNECTION
);
export const userHistoryConnection = createConnection(
  process.env.USER_HISTORY_DB_CONNECTION
);
