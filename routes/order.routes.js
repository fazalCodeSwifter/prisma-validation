import express from "express";
import {
  createOrder,
  getAllOrders,
  getSingleOrder,
} from "../controllers/order.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

const router = express.Router();

router.get("/orders", [isAuth, isAdmin], getAllOrders);
router.get("/orders/:id", [isAuth, isAdmin], getSingleOrder);
router.post("/orders", [isAuth], createOrder);

export default router;
