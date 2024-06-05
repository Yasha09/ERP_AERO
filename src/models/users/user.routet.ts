import {Router} from "express";
import {authMiddleware} from "../../middlewares/auth.middleware";
import userController from "./user.controller";

const userRouter = Router();

userRouter.get("/info",authMiddleware, userController.info);

export default userRouter;