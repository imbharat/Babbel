import { Router } from "express";
import container from "../../container/Container";
import UserController from "../../controllers/UserController";

const userRouter = Router();
const userController = container.resolve(UserController);

userRouter.get("/email", userController.deriveEmail);

userRouter.get("/email-fast", userController.deriveEmailFast);

export default userRouter;
