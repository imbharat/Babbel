import { Router } from "express";
import userRouter from "./User/UserRoutes";

const router = Router();

router.use("/users", userRouter);

export default router;
