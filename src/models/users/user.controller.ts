import {NextFunction, Request, Response} from "express";
import authService from "../auth/auth.service";
import {HTTPStatus} from "../../errorHandler/types";
import userService from "./user.service";

class UserController {
    async info(req: Request, res: Response, next: NextFunction) {
        const user = req.user;
        try {
            const userInfo = await userService.userInfo(user.id);
            res.status(HTTPStatus.OK).json(userInfo);
        } catch (error) {
            next(error);
        }
    }
}

const userController = new UserController();
export default userController;