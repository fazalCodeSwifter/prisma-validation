import express from "express";
import {
  createOrder,
  getAllOrders,
  getSingleOrder,
} from "../controllers/order.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createOrderValidate } from "../validations/index.js";

const router = express.Router();

router.get("/orders", [isAuth, isAdmin], getAllOrders);
router.get("/orders/:id", [isAuth, isAdmin], getSingleOrder);
router.post("/orders", [isAuth], validate(createOrderValidate), createOrder);

export default router;
