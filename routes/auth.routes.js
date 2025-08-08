import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createRegisterValidate } from "../validations/register.validate.js";

import { isAuth } from "../middlewares/auth.middleware.js";
import { userController } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/register", validate(createRegisterValidate), registerController);
router.post("/login", loginController);
router.get("/users", isAuth, userController);

export default router;
