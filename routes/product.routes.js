import express from "express";
import {
  geAlltProducts,
  createProduct,
  deleteProduct,
  singleProduct,
  updateProduct,
} from "../controllers/products.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createProductValidate } from "../validations/index.js";
const router = express.Router();

router.get("/products", geAlltProducts);
router.get("/products/:id", singleProduct);
router.post("/products", [isAuth, isAdmin], validate(createProductValidate), createProduct);
router.put("/products/:id", [isAuth, isAdmin], validate(createProductValidate), updateProduct);
router.delete("/products/:id", [isAuth, isAdmin], deleteProduct);

export default router;
