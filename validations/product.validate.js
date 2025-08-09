import { body } from "express-validator";

export const createProductValidate = [
    body("title")
        .notEmpty()
        .withMessage("title must be required")
        .bail()
        .isString()
        .withMessage("title must be an string ('TEXT') only"),

    body("description")
        .notEmpty()
        .withMessage("description must be required")
        .bail()
        .isString()
        .withMessage("description must be an string ('TEXT') only"),

    body("price")
        .notEmpty()
        .withMessage("price must be required")
        .bail()
        .isNumeric({ no_symbols: true })
        .withMessage("price must be Numeric only"),

    body("imageURL")
        .notEmpty()
        .withMessage("image must be required")
];
