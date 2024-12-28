import { Router } from "express";
import { helthcheck } from "../controllers/helthcheck_controller.js"; // Added .js extension

const router = Router();

router.route("/").get(helthcheck);
router.route("/test").get(helthcheck);

export default router;
