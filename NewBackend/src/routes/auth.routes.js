import { Router } from "express";
import { registerUser, login } from "../controllers/auth.controllers.js";

import { validate } from "../middlewares/vaildator.middleware.js";
import { userRegistValidator, userLoginValidator } from "../validators/index.js";  // <-- import here

const router = Router();

router.route("/register").post(userRegistValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, login);

export default router;
