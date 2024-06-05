import {Router} from "express";

import authValidator from "./validation";
import authController from "./auth.controller";
import {refreshTokenMiddleware} from "../../middlewares/refresh-token.middleware";

const authRouter = Router();

authRouter.post("/signup", authValidator.signUp, authController.signUp);

authRouter.post("/signin", authValidator.signIn, authController.signIn);

authRouter.get("/new_token",  refreshTokenMiddleware, authController.refreshTokens);

authRouter.get("/logout", refreshTokenMiddleware, authController.logout);




export default authRouter;