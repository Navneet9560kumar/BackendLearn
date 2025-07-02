import { Router } from "express";

const authRouter = Router();

authRouter.post("/sing-up", (req, res) => (res.send({ title: "sing UP" })));
authRouter.post("/sing-in", (req, res) => (res.send({ title: "sing in" })));
authRouter.post("/sing-out", (req, res) => (res.send({ title: "sing out" })));

export default authRouter;
