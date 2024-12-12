import asyncWrapper from "../middleware/asyncWrapper.mjs";
import { userLoginModel } from "../model/model.mjs";
import bcrypt from "bcrypt";

const postDataSingUp = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;

  const findUser = await userLoginModel.findOne({ email });

  if (findUser) {
    return res.status(409).json({ message: "Email has been used" });
  }

  const saltRounds = 16;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = new userLoginModel({
    name: name,
    email: email,
    password: hashedPassword,
  });

  await newUser.save();
  return res
    .status(201)
    .json({ message: "New user data successfully created and stored" });
});

export default postDataSingUp;
