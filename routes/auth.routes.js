import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createLoginValidate, createRegisterValidate } from "../validations/index.js";

import { isAuth } from "../middlewares/auth.middleware.js";
import { userController } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/register", validate(createRegisterValidate), registerController);
router.post("/login", validate(createLoginValidate), loginController);
router.get("/users", isAuth, userController);

export default router;
