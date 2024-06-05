import {AuthRequest} from "../common/interfaces";
import {NextFunction, Response} from "express";
import {getAccessToken, getUserByPayload} from "./index";
import refreshTokenService from "../models/auth/refreshToken.service";

export const refreshTokenMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userPayload = await refreshTokenService.verify(req.cookies.jwt);
        req.user = await getUserByPayload(userPayload);
        next();

    } catch (error) {
        next(error);
    }

}
