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
const router = express.Router();

router.get("/products", geAlltProducts);
router.get("/products/:id", singleProduct);
router.post("/products", [isAuth, isAdmin], createProduct);
router.put("/products/:id", [isAuth, isAdmin], updateProduct);
router.delete("/products/:id", [isAuth, isAdmin], deleteProduct);

export default router;
