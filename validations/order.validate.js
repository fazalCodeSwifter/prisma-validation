import { body } from "express-validator";

export const createOrderValidate = [
    body("orders")
        .isArray({ min: 1 })
        .withMessage("Orders array is required and cannot be empty"),

    body("orders.*.productId")
        .notEmpty()
        .withMessage("productId is required")
        .bail()
        .isInt({ min: 1 })
        .withMessage("productId must be a positive integer"),

    body("orders.*.quantity")
        .notEmpty()
        .withMessage("quantity is required")
        .bail()
        .isInt({ min: 1 })
        .withMessage("quantity must be at least 1"),
];
