import { body } from "express-validator";

export const createLoginValidate = [

  body("email")
    .notEmpty()
    .withMessage("email is required!")
    .bail()
    .isEmail()
    .withMessage("Enter a valid Email.")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("password must be required")
    .bail()
    .isLength({ min: 4 })
    .withMessage("password must be at least 4 characters required"),
];
