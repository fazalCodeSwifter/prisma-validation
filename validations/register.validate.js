import { body } from "express-validator";

export const createRegisterValidate = [
  body("username")
    .notEmpty()
    .withMessage("username must be required")
    .isLength({ min: 3 })
    .withMessage("username must be at least 3 characters required"),

  body("email")
    .notEmpty()
    .withMessage("email is required!")
    .isEmail()
    .withMessage("Enter a valid Email.")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("password must be required")
    .isLength({ min: 4 })
    .withMessage("password must be at least 8 characters required"),
];
