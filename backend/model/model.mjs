import {
  userLoginConnection,
  userCartsConnection,
  userProductConnection,
  userHistoryConnection,
} from "../db/connect.mjs";

import { mongoose, Schema } from "mongoose";

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
    role: {
      type: String,
      default: "user",
      require: true,
    },
    wallet: {
      type: Number,
      default: 0,
      require: true,
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
  productId: {
    require: true,
    type: String,
  },
});

export const userProductModel = userProductConnection.model(
  "user-products-OSV2",
  userProductSchema
);
