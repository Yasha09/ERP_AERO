import {AuthRequest} from "../common/interfaces";
import {NextFunction, Response} from "express";

import {Exception} from "../errorHandler/exception";
import {HTTPStatus} from "../errorHandler/types";
import errorMessages from "../common/constants/errorMessages";
import accessTokenService from "../models/auth/accessToken.service";
import {getAccessToken, getUserByPayload} from "./index";






export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = getAccessToken(req);
        if (!token) {
            // todo
            throw new Exception(HTTPStatus.Unauthorized, {
                message: errorMessages.unAuthenticated,
            });
        }

        const userPayload = await accessTokenService.verify(token);

        req.user = await getUserByPayload(userPayload);
        next();
    } catch (error) {
        next(error);
    }
}
