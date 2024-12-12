import { body, validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
};

export const validateSignup = [
  body("email").isEmail().withMessage("Email isn't valid.").normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("The password must contain at least 8 characters.")
    .matches(/\d/)
    .withMessage("Password must contain number at least 1.")
    .matches(/[!@#$%^&*(),.?\":{}|<>]/)
    .withMessage("Password must contain symbol at least 1."),

  body("name")
    .notEmpty()
    .withMessage("Username can't be empty.")
    .isLength({ min: 3 })
    .withMessage("The username must contain at least 3 characters"),
];

export const validateProduct = [
  body("name")
    .notEmpty()
    .withMessage("Name can't be empty.")
    .isLength({ min: 3 })
    .withMessage("The name must contain at least 3 characters"),
  body("description")
    .notEmpty()
    .withMessage("Description can't be empty")
    .isLength({ min: 3 })
    .withMessage("The description must contain at least 3 characters"),
  body("price")
    .notEmpty()
    .withMessage("Price can't be empty")
    .isNumeric()
    .withMessage("Price must be a number"),
];
