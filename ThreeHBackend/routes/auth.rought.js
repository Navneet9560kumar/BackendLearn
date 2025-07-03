import { Router } from "express";
import { singIn, singout, singUp } from "../controllers/auth.controlls";

const authRouter = Router();

authRouter.post('/sign-up', singUp);

authRouter.post('/sign-in', singIn);

authRouter.post('/sign-out',singout);
export default authRouter;
